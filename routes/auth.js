const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {signup} = require('../controllers/auth');
const {signin} = require('../controllers/auth');
const {signout, isSignedIn} = require('../controllers/auth');
const User = require('../models/user');
router.post("/signup",[
    check('email')
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Must be an email")
       .custom(value => {
        console.log(value);
        return User.findOne({email: value}).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        })
      }),
      check('password')
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({min:3})
      .withMessage("Password must be atleast 3 characters long")
  ], signup);

  router.post("/signin",[
    check('email')
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Must be an email"),
    check('password')
      .notEmpty()
      .withMessage("Password is required")
  ], signin)

  router.get("/signout", signout)

  router.get("/testRoute", isSignedIn, (req,res)=> {
      res.json({
          mg: 'Hii'
      })
  })
module.exports = router;