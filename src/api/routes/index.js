const SessionHandler = require("../handlers/Session");
const RecordHandler = require("../handlers/Record");
const UserHandler = require("../handlers/User");

module.exports = router => {
  router.post('/users', UserHandler.store);
  router.post('/users/auth', SessionHandler.store);

  router.post('/records/', RecordHandler.store);
  router.get('/records/:id', RecordHandler.show);
  router.get('/records', RecordHandler.index);
  router.delete('/records/:id', RecordHandler.delete);
  router.patch('/records/:id', RecordHandler.update);

  return router;
};