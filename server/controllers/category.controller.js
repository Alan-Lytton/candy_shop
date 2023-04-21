const Category = require("../models/category.model");
const {capitalize} = require("../utilities/candyShop.utilities")

module.exports.createCategory = (req,res) =>{
    const temp = req.body.categoryName
    Category.create({categoryName:capitalize(temp)})
        .then(newCategory => res.json({newCategory}))
        .catch(err => res.status(400).json(err))
}

module.exports.getAllCategories = (req,res) =>{
    Category.find()
        .then(categories =>res.json({categories}))
        .catch(err =>res.status(400).json(err))
}  

module.exports.getOneCategory = (req,res) =>{
    Category.findOne({_id:req.params.id})
        .then(aCategory => res.json({oneCategory:aCategory}))
        .catch((err => res.status(400).json(err)))
}