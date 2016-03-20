var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var userPreference = require('./db/models/User_Preference.js');
var User = require('./db/models/User.js');
var db = require('./db/schema.js');
var jwt = require('jwt-simple');
var Utils = require('./utils.js');
var ratingsController = require('./controllers/ratingsController.js');
app.use(bodyParser.json());
require('./routes/routes.js')(app, express);

var port = process.env.PORT || 8000;

var server = app.listen(port, function() {
  console.log('http://localhost:' + port);
});

var test = function() {
  ratingsController.postRatingToTable();
};

test();

module.exports = app;
