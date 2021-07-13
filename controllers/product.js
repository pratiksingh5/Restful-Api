const Product = require('../models/product');
const fs = require('fs')
const formidable = require('formidable');
const _  = require('lodash');


exports.createProduct = (req, res)=> {
   const form = formidable.IncomingForm();
   form.keepExtensions = true;
   form.parse(req, (err, fields, file)=> {
       if(err) {
           return res.status(400).json({
               error: "Problem with Image"
           })
       }
       const {name, description, price, stock, category} = fields;
       console.log(fields);
       let product = new Product(fields);
       if(file.photo) {
        if(file.photo.size> 3000000) {
            return res.status(400).json({
                errors: "File too big"
            }) 
        }
       product.photo.data = fs.readFileSync(file.photo.path);
       product.photo.contentType = file.photo.type;
       }
       product.save((err, product)=> {
        if(err){
            return res.status(400).json({
                error: "saving product failed"
            }) 
        }
        res.json(product);
    })

   })
}