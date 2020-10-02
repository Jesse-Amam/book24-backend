const { Room } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.room_type_id) {
    return res.status(400).send({
      message: "Room type id field is required",
    });
  }
  let user_id;
  if (req.user) {
    user_id = req.user.id;
  } else {
      return res.status(400).send({ message: "User id is required" });
  }
  req.body.created_by = user_id;
  // Save room in the database
  try {
    // create a new room
    let room = await Room.create(req.body);
    // send back the new room
    return res.json(room);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all rooms from the database.
exports.findAll = (req, res) => {
 Room.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(rooms => {
  res.send(rooms);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the rooms."
  });
});
};

// Retrieve one room from the database based on id.
exports.findOne = (req, res) => {
  const room_id = req.params.room_id
  
  Room.findOne(
    {  where: {
      id: room_id,
    }, include: author }
  ).then(room => {
    res.send(room);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the rooms."
   });
 });
 };
