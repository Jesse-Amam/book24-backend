module.exports = app => {
  const rentalBooking = require("../controllers/rentalBooking.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new RentalBooking
  app.post("/rentalBooking", tokenMiddleware.checkToken, rentalBooking.create);

  // Get all rentalBookings(paginated by 10)
  app.get("/rentalBookings", tokenMiddleware.checkToken,rentalBooking.findAll);

    // Get all rentalBookings(paginated by 10) based on rentalBooking_id
    app.get("/rentalBookings/:rentalBooking_id", tokenMiddleware.checkToken,rentalBooking.findOne);

};
