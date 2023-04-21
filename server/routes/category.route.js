const CategoryController = require("../controllers/category.controller")
const {authenticate} = require("../config/jwt.config");


module.exports=(app) =>{
    app.get("/api/category", CategoryController.getAllCategories)
    app.post("/api/category/add", CategoryController.createCategory)
}