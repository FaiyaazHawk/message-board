var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.find()
  res.render('users', {users: users});
});

module.exports = router;
