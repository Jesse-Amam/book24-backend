module.exports = app => {
  const ticketType = require("../controllers/ticketType.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new ticketType
  app.post("/ticketType", tokenMiddleware.checkToken, ticketType.create);

  // Get all ticketTypes(paginated by 10)
  app.get("/ticketTypes", tokenMiddleware.checkToken,ticketType.findAll);

    // Get all ticketTypes(paginated by 10) based on ticketType_id
    app.get("/ticketTypes/:ticketType_id", tokenMiddleware.checkToken,ticketType.findOne);

};
