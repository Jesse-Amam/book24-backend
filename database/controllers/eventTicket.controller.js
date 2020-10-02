const { EventTicket } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.user_id) {
    return res.status(400).send({
      message: "User id field can not be empty",
    });
  } else if (!req.body.event_id) {
    return res.status(400).send({
      message: "Event id field is required",
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
  // Save eventTicket in the database
  try {
    // create a new eventTicket with the password hash from bcrypt
    let eventTicket = await EventTicket.create(req.body);
    // send back the new eventTicket
    return res.json(eventTicket);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all eventTickets from the database.
exports.findAll = (req, res) => {
 EventTicket.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(eventTickets => {
  res.send(eventTickets);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the eventTickets."
  });
});
};

// Retrieve one eventTicket from the database based on id.
exports.findOne = (req, res) => {
  const eventTicket_id = req.params.eventTicket_id
  
  EventTicket.findOne(
    {  where: {
      id: eventTicket_id,
    }, include: author }
  ).then(eventTicket => {
    res.send(eventTicket);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the eventTickets."
   });
 });
 };
