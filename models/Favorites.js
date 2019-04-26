const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const FavoritesSchema = new Schema({
  // `name` must be unique and of type String
  notes: {
    type: String,
    unique: true
  },
  preferences: {
    type: String,
    unique: true
  }
});

// This creates our model from the above schema, using mongoose's model method
const Favorites = mongoose.model("Favorites", FavoritesSchema);

// Export the User model
module.exports = Favorites;