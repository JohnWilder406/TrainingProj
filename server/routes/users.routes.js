const UserController = require('../controllers/users.controller');

module.exports = (app) => {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.put("/api/users/:id", UserController.update);
    app.get("/api/user/get/:id", UserController.get);
}