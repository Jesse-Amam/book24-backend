const { TourBooking } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).send({
      message: "User id field can not be empty",
    });
  } else if (!req.body.tour_id) {
    return res.status(400).send({
      message: "Tour id field is required",
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
  // Save tourBooking in the database
  try {
    // create a new tourBooking with the password hash from bcrypt
    let tourBooking = await TourBooking.create(req.body);
    // send back the new tourBooking
    return res.json(tourBooking);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all tourBookings from the database.
exports.findAll = (req, res) => {
 TourBooking.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(tourBookings => {
  res.send(tourBookings);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the tourBookings."
  });
});
};

// Retrieve one tourBooking from the database based on id.
exports.findOne = (req, res) => {
  const tourBooking_id = req.params.tourBooking_id
  
  TourBooking.findOne(
    {  where: {
      id: tourBooking_id,
    }, include: author }
  ).then(tourBooking => {
    res.send(tourBooking);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the tourBookings."
   });
 });
 };
