const express = require('express');
const router = express.Router();
const passport = require('passport')

// GET route
router.get('/', function (req,res,next) {
    res.render('login', {title: "Login Form"})
})


//POST route

router.post('/', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user)
    res.render('index', {title: `Welcome Back ${req.user.first_name}` , user: req.user})
  });

module.exports = router