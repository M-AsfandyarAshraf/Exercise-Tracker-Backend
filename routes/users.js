var express = require('express');
var router = express.Router();

/* GET logged in uesr listing. */
router.get('/', auth, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
