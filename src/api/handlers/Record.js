const Yup = require("yup");
const DBError = require("../utils/errors/DBError");

const RecordCore = require("../core/Record");
class RecordHandler {

  index(req, res){

  }

  async store(req, res){
    const { picture, location } = req.body;

    const data = { picture, location }
    
    const schema = Yup.object().shape({
      picture: Yup.string().required('Picture required'),
      location: Yup.object().shape({
        latitude: Yup.number().required('Latitude required'),
        longitude: Yup.number().required('Longitude required'),
      }).required('Location required'),
    });

    try {
      await await schema.validate(data, {
        abortEarly: false,
      });

      const record = await RecordCore.create(data);

      res.status(201).json(record);
    } catch(error) {

      if(error instanceof Yup.ValidationError) {
        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send",
            details: error.errors,
          }
        });    
      }

      if(error instanceof DBError) {
        return res.status(500).json({ 
          error: { 
            message: "Internal server error",
            details: error.message,
          }
        });
      }

      return res.status(500).json({ 
        error: { 
          message: "Internal server error",
        }
      });
    }
  }

  show(){

  }

  update(){

  }

  delete(){

  }
  
}

module.exports = new RecordHandler();