const express = require('express');
const router = express.Router();
const passport = require('passport')

// GET route
router.get('/', function (req,res,next) {
    res.render('login', {title: "Login Form"})
})


//POST route

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error' 
}))

module.exports = router