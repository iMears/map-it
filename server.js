// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Import the controllers
var locationController = require('./controllers/location');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Create the Express application
var app = express();

// Connect to the mapit database
mongoose.connect('mongodb://localhost:27001/mapit', function (err, db) {
  if (!err) {
    console.log("Connected!");
  } else {
    console.log(err);
  }
});

// Use the body-parser package in the application
// The "extended" syntax allows for rich objects and arrays to be encoded into
// the urlencoded format, allowing for a JSON-like experience with urlencoded.
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create the Express router
var router = express.Router();

// Create endpoint handlers for /locations
router.route('/locations')
  .post(authController.isAuthenticated, locationController.postLocations)
  .get(locationController.getLocations);

// Create endpoint handlers for /Locations/:Location_id
router.route('/locations/:location_id')
  .get(authController.isAuthenticated, locationController.getLocation)
  .put(authController.isAuthenticated, locationController.putLocation)
  .delete(authController.isAuthenticated, locationController.deleteLocation);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handler for authenticating users
router.route('/authenticate')
  .post(userController.authenticateUser);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(process.env.PORT || 27001);
console.log("Listening on port 27001...");