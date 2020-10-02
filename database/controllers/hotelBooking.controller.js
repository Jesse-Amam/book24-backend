const { HotelBooking } = require("../models");

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
  } else if (!req.body.room_type_id) {
    return res.status(400).send({
      message: "User id field is required",
    });
  } else if (req.body.paid && !req.body.payment_reference) {
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
  // Save hotelBooking in the database
  try {
    // create a new hotelBooking with the password hash from bcrypt
    let hotelBooking = await HotelBooking.create(req.body);
    // send back the new hotelBooking
    return res.json(hotelBooking);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all hotelBookings from the database.
exports.findAll = (req, res) => {
 HotelBooking.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(hotelBookings => {
  res.send(hotelBookings);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the hotelBookings."
  });
});
};

// Retrieve one hotelBooking from the database based on id.
exports.findOne = (req, res) => {
  const hotelBooking_id = req.params.hotelBooking_id
  
  HotelBooking.findOne(
    {  where: {
      id: hotelBooking_id,
    }, include: author }
  ).then(hotelBooking => {
    res.send(hotelBooking);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the hotelBookings."
   });
 });
 };
