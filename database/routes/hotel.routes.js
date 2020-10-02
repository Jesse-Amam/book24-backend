module.exports = app => {
  const hotel = require("../controllers/hotel.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new Hotel
  app.post("/hotel", tokenMiddleware.checkIfHotel, hotel.create);

  // Get all hotels(paginated by 10)
  app.get("/hotels", tokenMiddleware.checkToken,hotel.findAll);

    // Get all hotels(paginated by 10) based on hotel_id
    app.get("/hotels/:hotel_id", tokenMiddleware.checkToken,hotel.findOne);

};
