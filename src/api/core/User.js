const bcrypt = require("bcrypt");

const db = require("../../db");

const AlreadyExistError = require("../utils/errors/AlreadyExistError");
const DBError = require("../utils/errors/DBError");

class UserCore {

  async create({ name, email, password, role = 'employee' }){
    const userEmail = await db('users').where("email", email).first();

    if(userEmail){
      throw new AlreadyExistError('E-mail already exist');
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const [ user ] = await db("users").insert({ 
      role,
      name, 
      email, 
      password: passwordHash,
    })
    .returning(["name", "email", "role"])
    .catch(() => {
      throw new DBError();
    });
    
    return user;

  }

}


module.exports = new UserCore();