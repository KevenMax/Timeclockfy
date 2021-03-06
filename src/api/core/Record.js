const { format } = require("date-fns");

const db = require("../../db");
const DBError = require("../utils/errors/DBError");
const NotFoundError = require("../utils/errors/NotFoundError");
class RecordCore {
  async create({ picture, location, user_id }){
    const time = format(new Date(), "H:m:s");

    const [ record ] = await db("records").insert({ 
      picture, 
      location, 
      time,
      user_id,
      date: new Date(),
    })
    .returning(["id", "picture", "location", "time", "date"])
    .catch(() => {
      throw new DBError();
    });

    return record;
  }

  async getById({ id, user_id }){
    const record = await db('records')
    .where({ id, user_id })
    .first()
    .catch((error) => {
      console.log(error);
      throw new DBError();
    });

    if(!record){
      throw new NotFoundError();
    }

    return record;
  }

  async getAll({ page, offset, user_id }){
    const records = await db('records')
    .where({enabled: true, user_id })
    .limit(offset)
    .offset((page - 1) * offset)
    .orderBy('created_at')
    .catch(() => {
      throw new DBError();
    });

    return records;
  }


  async deleteById(id){
    const record = await db('records')
    .where({ id })
    .update({enabled: false})
    .catch(() => {
      throw new DBError();
    })

    if(!record){
      throw new NotFoundError();
    }

    return !!record;
  }


  async updateById({id, picture, location, time, date }){
    const [ record ] = await db('records')
    .where({ id })
    .update({ picture, location, time, date })
    .returning(["id", "user_id", "picture", "location", "time", "date", "enabled"])
    .catch(() => {
      throw new DBError();
    })
    
    if(!record){
      throw new NotFoundError();
    }

    return record;
  }

};

module.exports = new RecordCore();