const CandyController = require("../controllers/candy.controller")
const {authenticate} = require("../config/jwt.config");


module.exports = (app) =>{
    app.get("/api/candy", CandyController.getAllCandy)
    app.get("/api/candy/:id", CandyController.getOneCandy)
    app.post("/api/candy/add", CandyController.createCandy)
    app.put("/api/candy/edit/:id", CandyController.updateCandy)
    app.delete("/api/candy/delete/:id",CandyController.deleteCandy)
}