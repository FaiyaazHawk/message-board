const Message = require("../models/message")
const {body, validationResult} = require('express-validator')
const User = require('../models/user')

//get all messages

exports.all_messages = async (req, res, next) => {
    try {
      // Populate message with "user" information (reference to user in model)
      const messages = await Message.find().sort([["timestamp", "descending"]]);
      return res.render('index', { title: 'Messages', user: req.user, messages: messages });
    } catch (err) {
      return next(err);
    }
  };


exports.createMessage_post = [
    body("title").trim().isLength({min:1}).escape().withMessage("Title is required"),
    body("message").trim().isLength({min:1}).escape().withMessage("Message is required"),

    async (req,res,next) => {
        //error validation
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            console.log('errors present')
            return res.redirect('/error') //send to error page
        }
        //create new message
        
        const message = new Message({
            title:req.body.title,
            message:req.body.message,
            author: req.user,
             //find where author status is stored with passport js
        });
        message.save(err => err ? next(err) : res.redirect('/'))
    }
]