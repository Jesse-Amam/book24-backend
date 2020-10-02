const { Hotel } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.bio) {
    return res.status(400).send({
      message: "Bio field is required, brief information about the hotel.",
    });
  } else if (!req.body.location) {
    return res.status(400).send({
      message: "Location field is required, address of the hotel.",
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
  // Save hotel in the database
  try {
    // create a new hotel
    let hotel = await Hotel.create(req.body);
    // send back the new hotel
    return res.json(hotel);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all hotels from the database.
exports.findAll = (req, res) => {
 Hotel.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(hotels => {
  res.send(hotels);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the hotels."
  });
});
};

// Retrieve one hotel from the database based on id.
exports.findOne = (req, res) => {
  const hotel_id = req.params.hotel_id
  
  Hotel.findOne(
    {  where: {
      id: hotel_id,
    }, include: author }
  ).then(hotel => {
    res.send(hotel);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the hotels."
   });
 });
 };
