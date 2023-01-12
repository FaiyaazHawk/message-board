var express = require('express');
var router = express.Router();
var message_controller = require ('../controllers/message_controller')

/* GET home page. */
router.get('/', message_controller.all_messages);

router.post('/', message_controller.deleteMessage_post)

module.exports = router;
