const Message = require("../models/message")
const {body, validationResult} = require('express-validator')

//get all messages

exports.all_messages = (req,res,next) => {
    Message.find()///figure out how to sort by latest timestamp
        .exec(function (err,messages) {
            if (err) {
                return next(err);
            }
            res.json(messages)
        })
}

//get a single message

exports.get_message = (req,res,next) => {
    Message.findById(req.params.id)
        .exec(function (err,message) {
            if (err) {
                return next(err)
            }
            res.json(message)
        })
}

exports.createMessage_get = (req,res,next) => {
    res.send('create message page')
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
            author: req.locals.currentUser, //find where author status is stored with passport js
        });
        message.save(err => err ? next(err) : res.redirect('/'))
    }
]