# Message-board
Message board with login and posting features. Made with express, node.js, mongoose and pug. Used MongoDB for database and Railways to host.
> Live demo [_here_](https://message-board-production-bfb0.up.railway.app/).



## General Information
As part of learning about authentication and serving specific features to specific users, decided to make a 
simple message board. One can create an account (stored on the backend on MongoDb) and then join the club using password SOFA
to get create post privileges. For Authentication, used the username and password strategy of Passport.js and hashed the password using bcrypt.
Used Pug as the templating engine to serve the pages on the site. Used Express/Nodejs to create the backend needed for the project.
Some of the routes are a bit messy since I was learning from various resources but I got it working nonetheless. Frontend design was left minimal for functionality sake as this 
was more of a backend project. 


## Technologies Used
   - "bcrypt"
   - "cookie-parser"
   - dotenv"
   - "express"
   - "express-session"
   - "express-validator"
   - "luxon"
   - "mongoose"
   - "morgan"
   - "nodemon"
   - "passport"
   - "passport-local"
   - "pug"

