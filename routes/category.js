const express = require('express');
const router = express.Router();
const Category = require('../models/category');

const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getCategory, getCategoryById, createCategory, updateCategory, getAllCategory, removeCategory} = require("../controllers/category")

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory)

router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory)

router.put('/category/update/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, updateCategory)

router.delete('/category/delete/:categoryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;