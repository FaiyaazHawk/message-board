const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')

//models
const User = require("../models/user");




//brings up list of all users
exports.all_users = (req,res,next) => {
    User.find()///figure out how to sort by latest timestamp
        .exec(function (err,users) {
            if (err) {
                return next(err);
            }
            res.json(users)
        })
}

//POST signup page and user creation
exports.signup_post = [
    body("first_name").trim().isLength({min: 1}).escape().withMessage("First name is required"),
    body("last_name").trim().isLength({min: 1}).escape().withMessage("Last name is required"),
    body("username").trim().isLength({min: 1}).escape().withMessage("User name is required"),
    body("password").trim().isLength({min:6}).escape().withMessage("Password must be atleast 6 characters long"),
    body("confirmPassword").trim().isLength({min:6}).escape().withMessage("Password must be atleast 6 characters long")
        .custom(async (value, {req}) => {
            //custom method to match passwords
            if (value !== req.body.password) throw new Error('Password must match');
            return true;
        }),
    
    async (req,res,next) => {
        //error validation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors)
            return res.redirect('/error') //send to error page

        }
        try {
            const userInDb = await User.find({"username": req.body.username});
            if (userInDb.length > 0) {
                console.log("user in database")
                return res.redirect('/error') //send to error page
            }
            bcrypt.hash(req.body.password, 10, (err,hashedPassword) => {
                if (err) return next (err);
                //create new user with sanitized data and hashed password
                const user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: hashedPassword,
                    member: false,
                    admin: false,
                    messages: null
                })
                user.save(err => err ? next(err) : res.redirect('/'))

            })
            
        } catch (error) {
            return next (error)
        }


    }
]