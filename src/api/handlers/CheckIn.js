const Yup = require("yup");

class CheckIn {

  index(req, res){

  }

  async store(req, res){
    const { picture, location } = req.body;

    const data = { picture, location }
    
    const schema = Yup.object().shape({
      picture: Yup.string().required('Foto required'),
      location: Yup.object().shape({
        latitude: Yup.number().required('Latitude required'),
        longitude: Yup.number().required('Longitude required'),
      }).required('Location required'),
    });

    try {
      await await schema.validate(data, {
        abortEarly: false,
      });

      return res.json(data);
    } catch(error){

      if (error instanceof Yup.ValidationError) {

        return res.status(400).json({ 
          error: { 
            message: "The some data don't was send",
            details: error.errors,
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

module.exports = new CheckIn();