const { RentalType } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } 
  let user_id;
  if (req.user) {
    user_id = req.user.id;
  } else {
      return res.status(400).send({ message: "User id is required" });
  }
  req.body.created_by = user_id;
  // Save rentalType in the database
  try {
    // create a new rentalType
    let rentalType = await RentalType.create(req.body);
    // send back the new rentalType
    return res.json(rentalType);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all rentalTypes from the database.
exports.findAll = (req, res) => {
 RentalType.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(rentalTypes => {
  res.send(rentalTypes);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the rentalTypes."
  });
});
};

// Retrieve one rentalType from the database based on id.
exports.findOne = (req, res) => {
  const rentalType_id = req.params.rentalType_id
  
  RentalType.findOne(
    {  where: {
      id: rentalType_id,
    }, include: author }
  ).then(rentalType => {
    res.send(rentalType);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the rentalTypes."
   });
 });
 };
