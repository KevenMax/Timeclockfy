const RecordHandler = require("../handlers/Record");

module.exports = router => {

  router.post('/records/', RecordHandler.store);

  return router;
};