const { RentalBooking } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).send({
      message: "User id field can not be empty",
    });
  } else if (!req.body.rental_id) {
    return res.status(400).send({
      message: "Rental id field is required",
    });
  }else if (!req.body.start_date) {
    return res.status(400).send({
      message: "Start date field is required",
    });
  }else if (!req.body.end_date) {
    return res.status(400).send({
      message: "End date field is required",
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
  // Save rentalBooking in the database
  try {
    // create a new rentalBooking with the password hash from bcrypt
    let rentalBooking = await RentalBooking.create(req.body);
    // send back the new rentalBooking
    return res.json(rentalBooking);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all rentalBookings from the database.
exports.findAll = (req, res) => {
 RentalBooking.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(rentalBookings => {
  res.send(rentalBookings);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the rentalBookings."
  });
});
};

// Retrieve one rentalBooking from the database based on id.
exports.findOne = (req, res) => {
  const rentalBooking_id = req.params.rentalBooking_id
  
  RentalBooking.findOne(
    {  where: {
      id: rentalBooking_id,
    }, include: author }
  ).then(rentalBooking => {
    res.send(rentalBooking);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the rentalBookings."
   });
 });
 };
