const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// create express app
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./database/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to book24-backend application." });
});

require("./database/routes/rental.routes")(app);
require("./database/routes/rentalBooking.routes")(app);
require("./database/routes/rentalType.routes")(app);
require("./database/routes/car.routes")(app);
require("./database/routes/carBooking.routes")(app);
require("./database/routes/user.routes")(app);
require("./database/routes/event.routes")(app);
require("./database/routes/ticketType.routes")(app);
require("./database/routes/eventTicket.routes")(app);
require("./database/routes/hotel.routes")(app);
require("./database/routes/hotelBooking.routes")(app);
require("./database/routes/room.routes")(app);
require("./database/routes/roomType.routes")(app);
require("./database/routes/tour.routes")(app);
require("./database/routes/tourBooking.routes")(app);
require("./database/routes/thingsToDo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});