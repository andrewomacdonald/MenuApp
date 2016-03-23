var restaurantController = require('../controllers/restaurantController.js');
var menuController = require('../controllers/menuController.js');
var userAuthController = require('../controllers/userAuthController.js');
var profileController = require('../controllers/profileController.js');
var preferenceController = require('../controllers/preferenceController.js');
var ratingsController = require('../controllers/ratingsController.js');
var bodyParser = require('body-parser').json();

module.exports = function(app, express) {

  app.use('/', express.static(__dirname + '/../../client'));

  app.use('/', express.static(__dirname + '/../../'));

  app.post('/api/restaurants', bodyParser, restaurantController.getRestaurants);
  app.post('/api/menu', bodyParser, menuController.getMenu);
  app.post('/api/users/signup', userAuthController.signup);
  app.post('/api/users/signin', userAuthController.signin);
  app.post('/api/ratings', ratingsController.postRatingToTable);
  app.get('/api/profile/profileView', bodyParser, profileController.getProfile);
  app.post('/api/preference', bodyParser, preferenceController.postPreference);
  app.post('/api/rating', ratingsController.postRatingToTable);
  app.get('/api/getRating', ratingsController.returnRating);
};
