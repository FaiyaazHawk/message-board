var express = require('express');
var router = express.Router();

const userController = require('../controllers/user_controller')

//GET signup page
router.get('/', function (req,res,next) {
    res.render('signupform', {title: "Sign Up Form"})
})

//POST signup page
router.post('/', userController.signup_post)

module.exports = router;