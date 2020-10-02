module.exports = app => {
  const room = require("../controllers/room.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new Room
  app.post("/room", tokenMiddleware.checkIfHotel, room.create);

  // Get all rooms(paginated by 10)
  app.get("/rooms", tokenMiddleware.checkToken,room.findAll);

    // Get all rooms(paginated by 10) based on room_id
    app.get("/rooms/:room_id", tokenMiddleware.checkToken,room.findOne);

};
