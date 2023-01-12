var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/user_controller')

//POST logout 

router.post('/', user_controller.logout_post);

module.exports = router;