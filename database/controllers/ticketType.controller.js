const { TicketType } = require("../models");

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
  // Save ticketType in the database
  try {
    // create a new ticketType
    let ticketType = await TicketType.create(req.body);
    // send back the new ticketType
    return res.json(ticketType);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all ticketTypes from the database.
exports.findAll = (req, res) => {
 TicketType.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(ticketTypes => {
  res.send(ticketTypes);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the ticketTypes."
  });
});
};

// Retrieve one ticketType from the database based on id.
exports.findOne = (req, res) => {
  const ticketType_id = req.params.ticketType_id
  
  TicketType.findOne(
    {  where: {
      id: ticketType_id,
    }, include: author }
  ).then(ticketType => {
    res.send(ticketType);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the ticketTypes."
   });
 });
 };
