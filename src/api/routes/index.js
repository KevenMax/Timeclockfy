

module.exports = router => {

  router.get('/clock', (req, res) => (res.status(200).json({message: 'OK'})) )

  return router;
}