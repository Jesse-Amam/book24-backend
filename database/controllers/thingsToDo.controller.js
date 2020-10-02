const { ThingsToDo } = require("../models");

exports.create = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name field can not be empty",
    });
  } else if (!req.body.price) {
    return res.status(400).send({
      message: "Price field is required, brief information about the thingsToDo.",
    });
  } else if (!req.body.location) {
    return res.status(400).send({
      message: "Location field is required, address of the thingsToDo.",
    });
  }else if (!req.body.description) {
    return res.status(400).send({
      message: "Description field is required, address of the thingsToDo.",
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
  // Save thingsToDo in the database
  try {
    // create a new thingsToDo
    let thingsToDo = await ThingsToDo.create(req.body);
    // send back the new thingsToDo
    return res.json(thingsToDo);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Retrieve and return all thingsToDos from the database.
exports.findAll = (req, res) => {
 ThingsToDo.findAndCountAll({
  //  where: {...},
    order: [['name','ASC']],
    limit: 10,
    offset: 0,
}).then(thingsToDos => {
  res.send(thingsToDos);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving the thingsToDos."
  });
});
};

// Retrieve one thingsToDo from the database based on id.
exports.findOne = (req, res) => {
  const thingsToDo_id = req.params.thingsToDo_id
  
  ThingsToDo.findOne(
    {  where: {
      id: thingsToDo_id,
    }, include: author }
  ).then(thingsToDo => {
    res.send(thingsToDo);
  })
 .catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving the thingsToDos."
   });
 });
 };
