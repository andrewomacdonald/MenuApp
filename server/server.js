var express = require('express');
var request = require('request');

var app = express();
var user = require('./db/models/User.js');
var item = require('./db/models/Item_Rating.js');
var restaurant = require('./db/models/Restaurant.js');
var menu = require('./db/models/Menu_Item.js');
var bodyParser = require('body-parser');
var db = require('./db/schema.js');
var jwt = require('jwt-simple');
app.use(bodyParser.json());
require('./routes/routes.js')(app, express);

var port = process.env.PORT || 8000;

var server = app.listen(port, function() {
  console.log('http://localhost:' + port);
});

var test = function(){
  var rating = 5;
  new item({rating: rating})
    .fetch()
    .then(function(itemRating){
      if(!itemRating) {
        var newRating = new item({
          rating: rating
        });
      newRating.save()
        .then(function (){
          console.log('Rating Inserted');
        })
      } else {
        console.log('Rating not inserted');
      }
    })
}

var test1 = function(){
  var entree = "salisbury steak";
  new menu({item: entree})
    .fetch()
    .then(function(dish) {
      if(!dish){
        var newDish = new menu({
          item: entree
        });
      newDish.save()
        .then(function () {
          console.log('entree inserted');
        })
      } else {
        console.log('entree not inserted');
      }
    })
}

var test2 = function(){
  var eatery = "denny's";
  new restaurant({restaurant_id: eatery})
    .fetch()
    .then(function(place) {
      if(!place){
        var newRestaurant = new restaurant({
          restaurant_id: eatery
        });
    newRestaurant.save()
      .then(function() {
        console.log('restaurant is inserted');
      })
    } else {
      console.log('restaurant not inserted');
    }
  })
}
test();
test1();
test2();

module.exports = app;
