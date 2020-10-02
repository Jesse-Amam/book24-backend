module.exports = app => {
  const event = require("../controllers/event.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new Event
  app.post("/event", tokenMiddleware.checkToken, event.create);

  // Get all events(paginated by 10)
  app.get("/events", tokenMiddleware.checkToken,event.findAll);

    // Get all events(paginated by 10) based on event_id
    app.get("/events/:event_id", tokenMiddleware.checkToken,event.findOne);

};
