const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    // app.get("/api/user", authenticate, UserController.findAll);  //Tested (For expantion use)
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout);
    app.get("/api/user/:id", UserController.getOne);
    // app.put("/api/user/:id", UserController.update); // Tested and working (For expantion use, PW needs encryption if changed!)
    // app.delete("/api/user/:id", UserController.delete); // Tested and working (For expantion use)
}