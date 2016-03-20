var restaurantController = require('../controllers/restaurantController.js');
var menuController = require('../controllers/menuController.js');
var userAuthController = require('../controllers/userAuthController.js');
<<<<<<< HEAD
var profileController = require('../controllers/profileController.js');
=======
var ratingsController = require('../controllers/ratingsController.js');
>>>>>>> [Feature] Fixed typos in collections/models, added .utils file, working on ratings route
var bodyParser = require('body-parser').json();

module.exports = function(app, express) {

  app.use('/', express.static(__dirname + '/../../client'));

  app.post('/api/restaurants', bodyParser, restaurantController.getRestaurants);
  app.post('/api/menu', bodyParser, menuController.getMenu);
  app.post('/api/users/signup', userAuthController.signup);
  app.post('/api/users/signin', userAuthController.signin);
  app.get('/api/profile/profileView', bodyParser, profileController.getProfile);
  app.post('/api/ratings', ratingsController.postRatingToTable);
};
