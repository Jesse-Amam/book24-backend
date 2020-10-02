const { CarBooking } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).send({
      message: "User id field can not be empty",
    });
  } else if (!req.body.check_in_date) {
    return res.status(400).send({
      message: "Check in date field is required",
    });
  } else if (!req.body.check_out_date) {
    return res.status(400).send({
      message: "Check out date field is required",
    });
  }else if (!req.body.car_id) {
    return res.status(400).send({
      message: "Car id field is required",
    });
  }else if (req.body.paid && !req.body.payment_reference) {
    return res.status(400).send({
      message: "Payment reference field is required",
    });
  }
  let user_id;
  if (req.user) {
    user_id = req.user.id;
  } else {
      return res.status(400).send({ message: "User id is required" });
  }
  req.body.created_by = user_id;
  // Save carBooking in the database
  try {
    // create a new carBooking with the password hash from bcrypt
    let carBooking = await CarBooking.create(req.body);
    // send back the new carBooking
    return res.json(carBooking);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all carBookings from the database.
exports.findAll = (req, res) => {
 CarBooking.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(carBookings => {
  res.send(carBookings);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the carBookings."
  });
});
};

// Retrieve one carBooking from the database based on id.
exports.findOne = (req, res) => {
  const carBooking_id = req.params.carBooking_id
  
  CarBooking.findOne(
    {  where: {
      id: carBooking_id,
    }, include: author }
  ).then(carBooking => {
    res.send(carBooking);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the carBookings."
   });
 });
 };
