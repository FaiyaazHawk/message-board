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
//GET signup page
exports.signup_get = (req,res,next) => {
    res.send("signup page")
}
//POST signup page and user creation
exports.signup_post = [
    body("first_name").trim().isLength({min: 1}).escape().withMessage("First name is required"),
    body("last_name").trim().isLength({min: 1}).escape().withMessage("Last name is required"),
    body("email").trim().isLength({min: 1}).escape().withMessage("Email is required"),
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
            console.log('errors present')
            return res.redirect('/error') //send to error page

        }
        try {
            const userInDb = await User.find({"email": req.body.email});
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
                    email: req.body.email,
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