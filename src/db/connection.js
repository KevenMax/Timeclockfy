const db = require("./index");

async function connection(){
  return db.raw('select 1+1 as result')
  .catch((err) => {
      console.error('[Fatal] Failed to establish connection to database! Exiting...');
      console.error(err);
      process.exit(1);
  });
}

module.exports = connection;