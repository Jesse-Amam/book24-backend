module.exports = app => {
    const tourBooking = require("../controllers/tourBooking.controller.js");
    let tokenMiddleware = require("../helpers/middleware.js");
    
    // Create a new TourBooking
    app.post("/tourBooking", tokenMiddleware.checkToken, tourBooking.create);
  
    // Get all tourBookings(paginated by 10)
    app.get("/tourBookings", tokenMiddleware.checkToken,tourBooking.findAll);
  
      // Get all tourBookings(paginated by 10) based on tourBooking_id
      app.get("/tourBookings/:tourBooking_id", tokenMiddleware.checkToken,tourBooking.findOne);
  
  };
  