const { format } = require("date-fns");

const db = require("../../db");
const DBError = require("../utils/errors/DBError");
const NotFoundError = require("../utils/errors/NotFoundError");
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

  async getById(id){
    const record = await db('records').where("id", id).first()
    .catch(() => {
      throw new DBError();
    });

    if(!record){
      throw new NotFoundError();
    }

    return record;
  }

  async getAll({page, offset}){
    const records = await db('records').where("enabled", true)
    .limit(offset)
    .offset((page - 1) * offset)
    .orderBy('created_at')
    .catch(() => {
      throw new DBError();
    });

    return records;
  }

};

module.exports = new RecordCore();