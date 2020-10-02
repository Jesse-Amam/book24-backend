const { Rental } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.location) {
    return res.status(400).send({
      message: "Location field is required",
    });
  }else if (!req.body.rental_type) {
    return res.status(400).send({
      message: "Rental type field is required",
    });
  }else if (!req.body.start_date) {
    return res.status(400).send({
      message: "Start date field is required",
    });
  }else if (!req.body.end_date) {
    return res.status(400).send({
      message: "End date field is required",
    });
  }
  let user_id;
  if (req.user) {
    user_id = req.user.id;
  } else {
      return res.status(400).send({ message: "User id is required" });
  }
  req.body.created_by = user_id;
  // Save rental in the database
  try {
    // create a new rental
    let rental = await Rental.create(req.body);
    // send back the new rental
    return res.json(rental);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all rentals from the database.
exports.findAll = (req, res) => {
 Rental.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(rentals => {
  res.send(rentals);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the rentals."
  });
});
};

// Retrieve one rental from the database based on id.
exports.findOne = (req, res) => {
  const rental_id = req.params.rental_id
  
  Rental.findOne(
    {  where: {
      id: rental_id,
    }, include: author }
  ).then(rental => {
    res.send(rental);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the rentals."
   });
 });
 };
