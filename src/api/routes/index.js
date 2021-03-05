const RecordHandler = require("../handlers/Record");

module.exports = router => {

  router.post('/records/', RecordHandler.store);
  router.get('/records/:id', RecordHandler.show);
  router.get('/records', RecordHandler.index);
  router.delete('/records/:id', RecordHandler.delete);
  router.patch('/records/:id', RecordHandler.update);

  return router;
};