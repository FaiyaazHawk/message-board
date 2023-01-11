const Message = require("../models/message")
const {body, validationResult} = require('express-validator')
const User = require('../models/user')

//get all messages

exports.all_messages = function () {
    const messages = Message.find()
    console.log('hello')
    console.log(messages)
    return messages;
    
}


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
        message.save(err => err ? next(err) : res.render('index', {messages:messages}))
    }
]