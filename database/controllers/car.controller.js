const { Car } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.price) {
    return res.status(400).send({
      message: "Price field is required.",
    });
  } else if (!req.body.type) {
    return res.status(400).send({
      message: "Type field is required, brief information about the car type.",
    });
  }else if (!req.body.model) {
    return res.status(400).send({
      message: "Model field is required, brief information about the car model.",
    });
  }else if (!req.body.location) {
    return res.status(400).send({
      message: "Location field is required, address of the car.",
    });
  }else if (!req.body.description) {
    return res.status(400).send({
      message: "Description field is required, address of the car.",
    });
  }else if (!req.body.features) {
    return res.status(400).send({
      message: "Features field is required",
    });
  }
  let user_id;
  if (req.user) {
    user_id = req.user.id;
  } else {
      return res.status(400).send({ message: "User id is required" });
  }
  req.body.created_by = user_id;
  // Save car in the database
  try {
    // create a new car
    let car = await Car.create(req.body);
    // send back the new car
    return res.json(car);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all cars from the database.
exports.findAll = (req, res) => {
 Car.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(cars => {
  res.send(cars);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the cars."
  });
});
};

// Retrieve one car from the database based on id.
exports.findOne = (req, res) => {
  const car_id = req.params.car_id
  
  Car.findOne(
    {  where: {
      id: car_id,
    }, include: author }
  ).then(car => {
    res.send(car);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the cars."
   });
 });
 };
