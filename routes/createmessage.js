var express = require('express');
var router = express.Router();
var message_controller = require ('../controllers/message_controller')


//GET
router.get('/', function (req,res,next) {
    res.render('createform')
})

//POST

router.post('/', message_controller.createMessage_post)


module.exports = router;