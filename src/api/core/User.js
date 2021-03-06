const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../../db");

const AlreadyExistError = require("../utils/errors/AlreadyExistError");
const DBError = require("../utils/errors/DBError");
const InvalidError = require("../utils/errors/InvalidError");
const NotFoundEnvError = require("../utils/errors/NotFoundEnvError");
const NotFoundError = require("../utils/errors/NotFoundError");

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

  async authenticate({ email, password }){
    const user = await db("users").where("email", email).first();
    
    if(!user){
      throw new NotFoundError('E-mail not found');
    }

    const passwordHash = await this.checkPassword(password, user.password);
    
    if(!passwordHash){
      throw new InvalidError('Password invalid');
    }

    const { id, name, role, created_at } = user;

    const token = this.generateToken(id, role);

    return { 
      id, 
      name,
      email,
      role,
      created_at,
      token,
    };
  }

  async checkPassword(password, passwordHash){
    return bcrypt.compare(password, passwordHash)
  }

  generateToken(id, role){
    const secret = process.env.APP_SECRET;

    if(!secret){
      throw new NotFoundEnvError("Not found secret environment");
    }

    return jwt.sign({ id, role }, secret, {
      expiresIn: '1d',
    });
  }

}


module.exports = new UserCore();