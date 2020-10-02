const { Event } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.location) {
    return res.status(400).send({
      message: "Location field is required",
    });
  }else if (!req.body.ticket_type) {
    return res.status(400).send({
      message: "Ticket type field is required",
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
  // Save event in the database
  try {
    // create a new event
    let event = await Event.create(req.body);
    // send back the new event
    return res.json(event);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all events from the database.
exports.findAll = (req, res) => {
 Event.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(events => {
  res.send(events);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the events."
  });
});
};

// Retrieve one event from the database based on id.
exports.findOne = (req, res) => {
  const event_id = req.params.event_id
  
  Event.findOne(
    {  where: {
      id: event_id,
    }, include: author }
  ).then(event => {
    res.send(event);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the events."
   });
 });
 };
