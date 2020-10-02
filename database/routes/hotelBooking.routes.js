module.exports = app => {
  const hotelBooking = require("../controllers/hotelBooking.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new HotelBooking
  app.post("/hotelBooking", tokenMiddleware.checkToken, hotelBooking.create);

  // Get all hotelBookings(paginated by 10)
  app.get("/hotelBookings", tokenMiddleware.checkToken,hotelBooking.findAll);

    // Get all hotelBookings(paginated by 10) based on hotelBooking_id
    app.get("/hotelBookings/:hotelBooking_id", tokenMiddleware.checkToken,hotelBooking.findOne);

};
