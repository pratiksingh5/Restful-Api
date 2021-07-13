const express = require('express');
const router = express.Router();
const {getUserById, getUser, getAllUsers, updateUser} = require('../controllers/user')
const {isSignedIn, isAuthenticated} = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId",isSignedIn, isAuthenticated, getUser);
router.get("/users", getAllUsers);

router.put("/user/update/:userId", isSignedIn, isAuthenticated, updateUser);



module.exports = router;