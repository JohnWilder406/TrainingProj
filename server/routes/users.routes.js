const UserController = require('../controllers/users.controller');

module.exports = (app) => {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.put("/api/users/:id", UserController.update);
    app.get("/api/users/get/:id", UserController.get);
    app.get("/api/users/get", UserController.getAllUsers);

    //path for adding workouts to user
    app.put("/api/users/:id/add", UserController.add);

    //path for completing a workout. this route replaces number left, so please do math on front end from original number and replace, do not subtract.
    app.put("/api/users/:id/complete/:workoutid", UserController.complete);

    //path for creating a user (testing only, don't use for final app)
    app.post("/api/users/create", UserController.createUser)

    //path for switching admin
    app.put("/api/users/admin/:id", UserController.admin)

    //path for admin logins
    app.post("/api/admin/login", UserController.adminLogin);
    app.delete("/api/users/:id", UserController.delete);
}