const express = require('express');
const router = express.Router(); 

const {createProduct} = require('../controllers/product');
const {getUserById} = require("../controllers/user");

router.param('userId', getUserById);
router.post('/product/create/:userId', createProduct)
 
module.exports = router; 