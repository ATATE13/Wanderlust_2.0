const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const TravelerSchema = new Schema({
  // `name` must be unique and of type String
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: false
  }
});

// This creates our model from the above schema, using mongoose's model method
const Traveler = mongoose.model("Traveler", TravelerSchema);

// Export the User model
module.exports = Traveler;
