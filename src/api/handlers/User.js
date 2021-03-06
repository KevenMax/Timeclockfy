const Yup = require("yup");

const UserCore = require("../core/User");

const AlreadyExistError = require("../utils/errors/AlreadyExistError");
const DBError = require("../utils/errors/DBError");

class UserHandler {

  async store(req, res){
    const { name, email, password } = req.body;

    const data = { name, email, password };
    
    const schema = Yup.object().shape({
      name: Yup.string().required('Name required'), 
      email: Yup.string().email('E-mail must be a valid email').required('E-mail required'),
      password: Yup.string().required('Password required').min(8),
    });

    try {
      const params = { abortEarly: false };

      await schema.validate(data, params);

      const user = await UserCore.create(data);

      res.status(201).json(user);
    } catch(error) {

      if(error instanceof Yup.ValidationError) {
        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send correctly",
            details: error.errors,
          }
        });    
      }

      if(error instanceof AlreadyExistError) {
        return res.status(400).json({ 
          error: { 
            message: "Bad request",
            details: error.message,
          }
        });
      }

      if(error instanceof DBError) {
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

module.exports = new UserHandler();