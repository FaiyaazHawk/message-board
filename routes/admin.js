var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller')

//get join page

router.get('/', function (req,res,next) {
    
    res.render('adminform', {title: 'Be an admin', })
})

//post join page

router.post('/', user_controller.beAdmin_post)

module.exports = router