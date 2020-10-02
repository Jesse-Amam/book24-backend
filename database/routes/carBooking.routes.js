module.exports = app => {
  const carBooking = require("../controllers/carBooking.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new CarBooking
  app.post("/carBooking", tokenMiddleware.checkToken, carBooking.create);

  // Get all carBookings(paginated by 10)
  app.get("/carBookings", tokenMiddleware.checkToken,carBooking.findAll);

    // Get all carBookings(paginated by 10) based on carBooking_id
    app.get("/carBookings/:carBooking_id", tokenMiddleware.checkToken,carBooking.findOne);

};
