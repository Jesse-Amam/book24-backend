module.exports = app => {
  const thingsToDo = require("../controllers/thingsToDo.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new ThingsToDo
  app.post("/thingsToDo", tokenMiddleware.checkToken, thingsToDo.create);

  // Get all thingsToDos(paginated by 10)
  app.get("/thingsToDos", tokenMiddleware.checkToken,thingsToDo.findAll);

    // Get all thingsToDos(paginated by 10) based on thingsToDo_id
    app.get("/thingsToDos/:thingsToDo_id", tokenMiddleware.checkToken,thingsToDo.findOne);

};
