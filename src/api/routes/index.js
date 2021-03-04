const CheckIn = require("../handlers/CheckIn");

module.exports = router => {

  router.post('/check-in', CheckIn.store)

  return router;
};