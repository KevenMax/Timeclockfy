const { format } = require("date-fns");

const db = require("../../db");
const DBError = require("../utils/errors/DBError");

class RecordCore {
  async create({ picture, location }){
    const time = format(new Date(), "H:m:s");

    const [ record ] = await db("records").insert({ 
      picture, 
      location, 
      time,
      date: new Date(),
    })
    .returning(["id", "picture", "location", "time", "date"])
    .catch(() => {
      throw new DBError();
    });

    return record;
  }

};

module.exports = new RecordCore();