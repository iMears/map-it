
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Create our Express application
var app = express();

// Connect to the mapit database
mongoose.connect('mongodb://localhost:27001/mapit', function (err, db) {
  if (!err) {
    console.log("Connected!");
  } else {
    console.log(err);
  }
});

// The body parser will let us parse the url-encoded http requests
// The "extended" syntax allows for rich objects and arrays to be encoded into
// the urlencoded format, allowing for a JSON-like experience with urlencoded.
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our router that
// will route the requests to the corresponding ressources
var router = express.Router();

// We tell our app to use
// our router with the api prefix
app.use('/api', router);

// We start the server by listening to port 3000
app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000...");