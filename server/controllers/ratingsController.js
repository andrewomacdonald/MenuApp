var request = require('request');
var _ = require('lodash');
var Item_Rating = require('../db/models/Item_Rating.js');
var User = require('../db/models/User.js');
var Restaurant = require('../db/models/Restaurant.js');
var Menu_Item = require('../db/models/Menu_Item.js');
var Utils = require('../utils.js');


module.exports = {
  postRating: function(request, response) {
      var token = request.body.token;
      var userID = Utils.getUserID(token);
      var rating = request.body.rating;
      var item_id = request.body.item_id;

      new Item_Rating( {rating: rating} )
      .fetch()
      .then(function (ratingExists){
        if(!ratingExists){
          var newRating = new Item_Rating({
            rating: rating,
            item_id: item_id,
            user_id: userID
          });
        newRating.save()
        .then(function() {
          console.log('rating inserted into table! you are a champion! i love you so much!');
        })
      }
    })
  }
};
