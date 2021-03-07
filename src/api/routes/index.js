const SessionHandler = require("../handlers/Session");
const RecordHandler = require("../handlers/Record");
const UserHandler = require("../handlers/User");

module.exports = router => {
  router.post('/users', UserHandler.store);
  router.post('/users/auth', SessionHandler.store);

  router.post(
    '/records/', 
    SessionHandler.authenticate('employee'),
    RecordHandler.store,
  );
  router.get(
    '/records/:id',
    SessionHandler.authenticate('employee'),
    RecordHandler.show,
  );
  router.get(
    '/records',
    SessionHandler.authenticate('employee'),
    RecordHandler.index
  );
  router.patch(
    '/records/:id',
    SessionHandler.authenticate('manager'),
    RecordHandler.update,
  );
  router.delete(
    '/records/:id',
    SessionHandler.authenticate('manager'),
    RecordHandler.delete,
  );

  return router;
};