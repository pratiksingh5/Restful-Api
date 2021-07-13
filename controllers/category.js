const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id)=> {
    console.log(id);
     Category.findById(id)
     .exec((err, category)=> {
        if(err) {
            return res.status(400).json({error: err})
        }
        if(!category) {
            return res.status(400).json({
                error: "category Does not exists"
            })
        }
        req.category = category;
        next();
    })
}

exports.getCategory = (req,res)=> {
    return res.json(req.category);
}

exports.getAllCategory = (req, res)=> {
    console.log("hii");
    Category.find()
    .exec((err, categories)=> {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        if(!categories) {
            return res.status(400).json({
                error: "No category Found"
            })
        }
        res.json(categories);
    })
}

exports.createCategory = (req, res)=> {
    console.log(req.body);
    const category = new Category(req.body);
    category.save((err, category)=> {
        if(err) {
            return res.status(400).json({
                error: "Not able to create category in db"
            })
        }
        res.json({category})
    })

}
exports.updateCategory = (req, res)=> {
    Category.findByIdAndUpdate(
        {_id: req.category._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, updateCategory)=> {
            if(err) {
                return res.status(400).json({error: "Updation Failed"})
            }
            res.json({updateCategory});
        }
    )
}

exports.removeCategory = (req, res)=> {
     Category.findByIdAndDelete({_id: req.category._id},
        (err, result)=> {
            if(err) {
                return res.status(400).json({error: "Deletion Failed"})
            }
            res.json({
                msg: "Deletion Done"
            })
     })
}