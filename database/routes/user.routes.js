module.exports = app => {
    const user = require("../controllers/user.controller.js");
    let tokenMiddleware = require("../helpers/middleware.js");
    // Create a new User
    app.post("/user", user.create);
  
    app.post("/login", user.login);

    // get user based on token
    app.get("/me",tokenMiddleware.checkToken, user.me);

    // Retrieve a single user with user_id
    app.get("/users/:user_id", tokenMiddleware.checkToken, user.findOne);
  };
  