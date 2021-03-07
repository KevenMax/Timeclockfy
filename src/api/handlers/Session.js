const jwt = require("jsonwebtoken");
const Yup = require("yup");

const UserCore = require("../core/User");

const InvalidError = require("../utils/errors/InvalidError");
const NotFoundEnvError = require("../utils/errors/NotFoundEnvError");
const NotFoundError = require("../utils/errors/NotFoundError");

class SessionHandler {

  async store(req, res){
    const { email, password } = req.body;

    const data = { email, password };
    
    const schema = Yup.object().shape({
      email: Yup.string().email('E-mail must be a valid email').required('E-mail required'),
      password: Yup.string().required('Password required').min(8),
    });

    try {
      const params = { abortEarly: false };

      await schema.validate(data, params);

      const {token, ...user } = await UserCore.authenticate(data);

      res.set({ token }).status(201).json(user);
    } catch(error) {
  
      if(error instanceof Yup.ValidationError) {
        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send correctly",
            details: error.errors,
          }
        });    
      }

      if(error instanceof NotFoundError) {
        return res.status(400).json({ 
          error: { 
            message: "Bad Request",
            details: error.message,
          }
        });
      }

      if(error instanceof InvalidError) {
        return res.status(401).json({ 
          error: { 
            message: "Unauthorized",
            details: error.message,
          }
        });
      }

      if(error instanceof NotFoundEnvError) {
        return res.status(500).json({ 
          error: { 
            message: "Internal Server Error",
            details: error.message,
          }
        });
      }

      return res.status(500).json({ 
        error: { 
          message: "Internal Server Error",
        }
      });

    }
  }

  authenticate(...roles){
    const isAllowed = role => roles.indexOf(role) > -1;
    const isManager = role => role === 'manager';
  
    return (req, res, next) => {
      const { authorization } = req.headers;
  
      if (!authorization) {
        return res.status(400).json({ 
          error: { 
            message: 'Bad Request', 
            details: 'Token not sent',
          } 
        });
      }
  
      try {
        const secret = process.env.APP_SECRET;

        if(!secret){
          throw new NotFoundEnvError("Not found secret environment");
        }

        const decoded = jwt.verify(authorization, secret);

        req.user = decoded;
  
        if (req.user && (isAllowed(req.user.role) || isManager(req.user.role))) {
          return next();
        }
        return res.status(403).json({
          error: { 
            message: 'Forbidden',
            details: 'Access not allowed',
          },
        });
      } catch (error) {

        if(error instanceof NotFoundEnvError){
          return res.status(500).json({ 
            error: { 
              message: "Internal Server Error",
              details: error.message,
            }
          });
        }

        return res
          .status(401)
          .json({ error: { 
            message: 'Unauthorized',
            details: 'Invalid token',
          }
        });
      }
    }
  }
}

module.exports = new SessionHandler();