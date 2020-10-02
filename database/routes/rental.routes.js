module.exports = app => {
  const rental = require("../controllers/rental.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new Rental
  app.post("/rental", tokenMiddleware.checkToken, rental.create);

  // Get all rentals(paginated by 10)
  app.get("/rentals", tokenMiddleware.checkToken,rental.findAll);

    // Get all rentals(paginated by 10) based on rental_id
    app.get("/rentals/:rental_id", tokenMiddleware.checkToken,rental.findOne);

};
