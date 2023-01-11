var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller')

//get join page

router.get('/', function (req,res,next) {
    res.render('joinform', {title: 'Join the club', user: req.user})
})

//post join page

router.post('/', user_controller.joinmem_post)

module.exports = router