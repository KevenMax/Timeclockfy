const Yup = require("yup");

const RecordCore = require("../core/Record");

const DBError = require("../utils/errors/DBError");
const NotFoundError = require("../utils/errors/NotFoundError");
class RecordHandler {

  async index(req, res){
    const { page = 1, offset = 20 } = req.query;

    const data = { page, offset };

    const schema = Yup.object().shape({
      page: Yup.number().integer().positive(),
      offset: Yup.number().integer().positive(),
    });

    try {
      const params = { abortEarly: false };

      await schema.validate(data, params);

      const records = await RecordCore.getAll(data);

      res.status(200).json(records);
    } catch(error) {

      if(error instanceof Yup.ValidationError) {
        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send correctly",
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

  async store(req, res){
    const { picture, location } = req.body;

    const data = { picture, location };
    
    const schema = Yup.object().shape({
      picture: Yup.string().required('Picture required'),
      location: Yup.object().shape({
        latitude: Yup.number().required('Latitude required'),
        longitude: Yup.number().required('Longitude required'),
      }).required('Location required'),
    });

    try {
      const params = { abortEarly: false };

      await schema.validate(data, params);

      const record = await RecordCore.create(data);

      res.status(201).json(record);
    } catch(error) {

      if(error instanceof Yup.ValidationError) {
        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send correctly",
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

  async show(req, res){
    const { id } = req.params;

    const schema = Yup.number().integer().positive().required('Record ID required');

    try {
      const params = { abortEarly: false };

      await schema.validate(id, params);

      const record = await RecordCore.getById(id);

      res.status(200).json(record);
    } catch(error) {
      if(error instanceof Yup.ValidationError) {
        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send correctly",
            details: error.errors,
          }
        });    
      }

      if(error instanceof NotFoundError){
        return res.status(400).json({ 
          error: { 
            message: "Not Found",
            details: error.message,
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

  update(){

  }

  async delete(req, res){
    const { id } = req.params;

    const schema = Yup.number().integer().positive().required('Record ID required');

    try {
      const params = { abortEarly: false };

      await schema.validate(id, params);

      await RecordCore.deleteById(id);

      res.status(204).json();
    } catch(error) {
      if(error instanceof Yup.ValidationError) {
        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send correctly",
            details: error.errors,
          }
        });    
      }

      if(error instanceof NotFoundError){
        return res.status(400).json({ 
          error: { 
            message: "Not Found",
            details: error.message,
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
  
}

module.exports = new RecordHandler();