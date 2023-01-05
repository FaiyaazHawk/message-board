var express = require('express');
var router = express.Router();

//GET signup page
router.get('/', function (req,res,next) {
    res.render('signupform', {title: "Sign Up Form"})
})

module.exports = router;