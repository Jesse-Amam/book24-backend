const { Tour } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.location) {
    return res.status(400).send({
      message: "Location field is required",
    });
  } else if (!req.body.price) {
    return res.status(400).send({
      message: "Price field is required",
    });
  }else if (!req.body.start_date) {
    return res.status(400).send({
      message: "Start date field is required",
    });
  }else if (!req.body.end_date) {
    return res.status(400).send({
      message: "End date field is required",
    });
  }else if (!req.body.description) {
    return res.status(400).send({
      message: "Description field is required",
    });
  }
  let user_id;
  if (req.user) {
    user_id = req.user.id;
  } else {
      return res.status(400).send({ message: "User id is required" });
  }
  req.body.created_by = user_id;
  // Save tour in the database
  try {
    // create a new tour 
    let tour = await Tour.create(req.body);
    // send back the new tour
    return res.json(tour);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all tours from the database.
exports.findAll = (req, res) => {
 Tour.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(tours => {
  res.send(tours);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the tours."
  });
});
};

// Retrieve one tour from the database based on id.
exports.findOne = (req, res) => {
  const tour_id = req.params.tour_id
  
  Tour.findOne(
    {  where: {
      id: tour_id,
    }, include: author }
  ).then(tour => {
    res.send(tour);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the tours."
   });
 });
 };
