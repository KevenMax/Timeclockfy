const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const Connection = require("../db/connection");
const routes = require("../api/routes");

require("dotenv").config();

class Boot {
  constructor(){
    this.init();
    this.middlewares();
    this.routes();
    this.start();
    this.database();
  }

  init(){
    this.express = express();
    this.router = express.Router();
  }

  middlewares(){
    this.express.use(cors({exposedHeaders: ["token"]}));
    this.express.use(bodyParser.json({ limit: '5mb', extended: true }));
    this.express.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    this.express.use(express.json());
  }

  async database(){
    await Connection.checkConnection();
    await Connection.runMigrations();
  }

  routes(){
    this.express.use(routes(this.router));
  }

  start(){
    const PORT_API = process.env.PORT_API || 4000;
    this.express.listen(PORT_API, () => {
      console.log(`🚀 Timeclockfy started on port ${PORT_API}\n`);
    });
  }
}

module.exports = new Boot();