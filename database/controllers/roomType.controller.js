const { RoomType } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.hotel_id) {
    return res.status(400).send({
      message: "Hotel id field is required",
    });
  } else if (!req.body.price) {
    return res.status(400).send({
      message: "Price field is required",
    });
  }else if (!req.body.capacity) {
    return res.status(400).send({
      message: "Capacity field is required",
    });
  }
  let user_id;
  if (req.user) {
    user_id = req.user.id;
  } else {
      return res.status(400).send({ message: "User id is required" });
  }
  req.body.created_by = user_id;
  // Save roomType in the database
  try {
    // create a new roomType
    let roomType = await RoomType.create(req.body);
    // send back the new roomType
    return res.json(roomType);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all roomTypes from the database.
exports.findAll = (req, res) => {
 RoomType.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(roomTypes => {
  res.send(roomTypes);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the roomTypes."
  });
});
};

// Retrieve one roomType from the database based on id.
exports.findOne = (req, res) => {
  const roomType_id = req.params.roomType_id
  
  RoomType.findOne(
    {  where: {
      id: roomType_id,
    }, include: author }
  ).then(roomType => {
    res.send(roomType);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the roomTypes."
   });
 });
 };
