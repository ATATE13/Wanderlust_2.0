const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;

// Require all models
const db = require("./models");

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populatedb", { useNewUrlParser: true });

// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
db.Traveler.create({ name: "Ernest Hemingway" })
  .then(function(dbTraveler) {
    console.log(dbTraveler);
  })
  .catch(function(err) {
    console.log(err.message);
  });

// Routes

// Route for retrieving all Traveler from the db
app.get("/traveler", function(req, res) {
  // Find all Traveler information
  db.Traveler.find({})
    .then(function(dbTraveler) {
      // If all NotesTraveler information is successfully found, send them back to the client
      res.json(dbTraveler);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for retrieving all Favorites from the db
app.get("/favorites", function(req, res) {
  // Find all user favorites
  db.Favorites.find({})
    .then(function(dbFavorites) {
      // If all user Favorites are successfully found, send them back to the client
      res.json(dbFavorites);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for saving a new Favorites to the db and associating it with a Traveler
app.post("/submit", function(req, res) {
  // Create a new Traveler in the db
  db.Traveler.create(req.body)
    .then(function(dbTraveler) {
      return db.Traveler.findOneAndUpdate({}, { $push: { Traveler: dbTraveler._id } }, { new: true });
    })
    .then(function(dbTraveler) {
      // If the Traveler was updated successfully, send it back to the client
      res.json(dbTraveler);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});



// // Start the server
// app.listen(PORT, function() {
//   console.log("App running on port " + PORT + "!");
// });

// const express = require("express");

// const mongoose = require("mongoose");
// const routes = require("./routes");
// const app = express();
// const PORT = process.env.PORT || 3001;

// // Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// // Add routes, both API and view
// app.use(routes);

// // Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// // Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });