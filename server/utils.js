var jwt = require('jwt-simple');
var db = require('./db/schema.js');
var Users = require('./db/collections/Users.js');
var User = require('./db/models/User.js');
var Menu_Items = require('./db/collections/Menu_Items.js');
var Menu_Item = require('./db/models/Menu_Item.js');
var Restaurants = require('./db/collections/Restaurants.js');
var Restaurant = require('./db/models/Restaurant.js');
var User_Preferences = require('./db/collections/User_Preferences.js');
var User_Preference = require('./db/models/User_Preference.js');
var Item_Rating = require('./db/collections/Item_Ratings.js');
var Item_Ratings = require('./db/models/Item_Rating.js');
var _ = require('lodash');


module.exports = {
  getUserID: function(token) {
    var currentUser = jwt.decode(token, 'secret');
    return currentUser.id;
  },

  getRestaurantID: function(restaurant, callback){
    Restaurant.where({'restaurant_id': restaurant}).fetch()
    .then(function(data){
      console.log(data);
    })
  },

  insertRestaurant: function(restaurant, callback){
    new Restaurant( {restaurant_id: restaurant} )
      .save()
      .then(function(){
        if(callback){
        callback(restaurant);
      }
    });
  },
};

  // insertMenuItem: function(menuitem, callback){
  //   new Menu_Item( {'item': menuitem} )
  //   .fetch();
  //   .then(function (menuitemexists){
  //     if(!menuitemexists){
  //       var newMenuItem = new Menu_Item({
  //         item: menuitem
  //       })
  //     }
  //   })
  // }


  // .then(function (restaurantExists){
  //   if(!restaurantExists){
  //     var newRestaurant = new Restaurant({
  //       restaurant_id: restaurant
  //     });
