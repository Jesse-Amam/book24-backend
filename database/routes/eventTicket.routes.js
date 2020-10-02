module.exports = app => {
  const eventTicket = require("../controllers/eventTicket.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new EventTicket
  app.post("/eventTicket", tokenMiddleware.checkToken, eventTicket.create);

  // Get all eventTickets(paginated by 10)
  app.get("/eventTickets", tokenMiddleware.checkToken,eventTicket.findAll);

    // Get all eventTickets(paginated by 10) based on eventTicket_id
    app.get("/eventTickets/:eventTicket_id", tokenMiddleware.checkToken,eventTicket.findOne);

};
