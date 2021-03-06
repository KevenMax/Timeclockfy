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
}

module.exports = new SessionHandler();