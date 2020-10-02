module.exports = app => {
    const tour = require("../controllers/tour.controller.js");
    let tokenMiddleware = require("../helpers/middleware.js");
    
    // Create a new Tour
    app.post("/tour", tokenMiddleware.checkToken, tour.create);
  
    // Get all tours(paginated by 10)
    app.get("/tours", tokenMiddleware.checkToken,tour.findAll);
  
      // Get all tours(paginated by 10) based on tour_id
      app.get("/tours/:tour_id", tokenMiddleware.checkToken,tour.findOne);
  
  };
  