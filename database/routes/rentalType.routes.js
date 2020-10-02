module.exports = app => {
  const rentalType = require("../controllers/rentalType.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new rentalType
  app.post("/rentalType", tokenMiddleware.checkToken, rentalType.create);

  // Get all rentalTypes(paginated by 10)
  app.get("/rentalTypes", tokenMiddleware.checkToken,rentalType.findAll);

    // Get all rentalTypes(paginated by 10) based on rentalType_id
    app.get("/rentalTypes/:rentalType_id", tokenMiddleware.checkToken,rentalType.findOne);

};
