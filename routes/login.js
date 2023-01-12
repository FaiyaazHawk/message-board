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
    
    res.redirect('/')
  });

module.exports = router