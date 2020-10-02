module.exports = app => {
  const car = require("../controllers/car.controller.js");
  let tokenMiddleware = require("../helpers/middleware.js");
  
  // Create a new Car
  app.post("/car", tokenMiddleware.checkToken, car.create);

  // Get all cars(paginated by 10)
  app.get("/cars", tokenMiddleware.checkToken,car.findAll);

    // Get all cars(paginated by 10) based on car_id
    app.get("/cars/:car_id", tokenMiddleware.checkToken,car.findOne);

};
