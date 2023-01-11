var express = require('express');
var router = express.Router();
var message_controller = require ('../controllers/message_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Messages', messages: message_controller.all_messages});
});

module.exports = router;
