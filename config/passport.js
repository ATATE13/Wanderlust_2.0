var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(
  new LocalStrategy(
    // Our user will sign in using an user name and email
    {
      usernameField: "userName",
      emailField: "email"
    },
    function(userName, password, done) {
      // When a user tries to sign in this code runs
      db.Traveler.findOne({
        where: {
          userName: userName
        }
      }).then(function(dbTraveler) {
        // If there's no Parent with the given email
        if (!dbTraveler) {
          return done(null, false, {
            message: "Incorrect user name."
          });
        }
        // If there is a Parent with the given email, but the password the Parent gives us is incorrect
        else if (!dbTraveler.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the Parent
        return done(null, dbTraveler);
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
