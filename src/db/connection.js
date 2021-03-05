const db = require("./index");
class Connection {
  async runMigrations(){
    const pendingMigrations = new Array(await db.migrate.list())[0][1];
    
    return db.migrate.latest()
    .then(() => {
      pendingMigrations.map((migration) => {
        console.log(`[Notice] Running migration ${migration.file}`);
      });

      if(pendingMigrations.length > 0){
        console.log("[Notice] The migrations have run successfully!");
      }
    })
    .catch((err) => {
      console.error('[Fatal] Failed to run pending migrations! Exiting...');
      console.error(err);
      process.exit(1);
    });
  }

  async checkConnection(){
    return db.raw('select 1+1 as result')
    .catch((err) => {
        console.error('[Fatal] Failed to establish connection with database! Exiting...');
        console.error(err);
        process.exit(1);
    });
  }
} 

module.exports = new Connection();