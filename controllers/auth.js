const User = require('../models/user');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');


exports.signup = (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
     return res.status(422).json({ error: errors.array()});
   }
    const user = new User(req.body) ;
    user.save((err, user)=> {
        if(err) {
           return res.status(400).json({
                error: err
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

exports.signin = (req,res)=> {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
     return res.status(422).json({ error: errors.array()});
   }
   User.findOne({email}, (err, user)=> {
       if(err) {
           return res.status(400).json({error: err})
       }
       if(!user) {
           return res.status(400).json({
               error: "User Does no exists"
           })
       }
       if(!user.authenticate(password)) {
           return res.status(400).json({
               error: "Email and Password donot match"
           })
       }
       //create token
       const token = jwt.sign({_id: user._id}, process.env.SECRET)
       //put token into cookie
       res.cookie("token", token, {expire: new Date() + 9999})
       //send data 
       res.json({
           token,
           user: {
               id: user._id,
               email: user.email,
               name: user.name,
               role: user.role
           }
       })
   })
}

exports.signout = (req,res)=> {
    res.clearCookie("token");
    res.json({
        message: "user signout successfully"
    })
}

exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

exports.isAuthenticated = (req,res,next)=> {
    console.log('went');
    console.log(req.profile);
    console.log(req.auth);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id; //auth in req.auth is userproperty value in isSignedIn middleware

    if(!checker) {
        return res.status(403).json({
            err: "ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req,res,next)=> {
    if(req.profile.role === 0) {
        return res.status(403).json({
            errors: "You are not admin, ACCESS DENIED"
        })
    }
    next();
}
