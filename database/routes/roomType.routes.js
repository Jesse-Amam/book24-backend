module.exports = app => {
  const roomType = require("../controllers/roomType.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new RoomType
  app.post("/roomType", tokenMiddleware.checkIfHotel, roomType.create);

  // Get all roomTypes(paginated by 10)
  app.get("/roomTypes", tokenMiddleware.checkToken,roomType.findAll);

    // Get all roomTypes(paginated by 10) based on roomType_id
    app.get("/roomTypes/:roomType_id", tokenMiddleware.checkToken,roomType.findOne);

};
