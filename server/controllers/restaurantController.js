var request = require('request');
var _ = require('lodash');
var moment = require('moment');

if(!process.env.CLIENTID) {
  var config = require('../db/config/config.js');
  var clientId = config.foursquare.clientId;
  var clientSecret = config.foursquare.clientSecret;
} else {
  var clientId = process.env.CLIENTID;
  var clientSecret = process.env.CLIENTSECRET;
}


module.exports = {

  getRestaurants: function(req, res) {
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var date = moment().format('YYYYMMDD');
    var query = `https://api.foursquare.com/v2/venues/search?ll=${lat},${long}` +
                `&limit=50&radius=1000&categoryId=4bf58dd8d48988d1c4941735&client_id=${clientId} ` +
                `&client_secret=${clientSecret}&v=${date}`;

    request(query, function(err, resp, body) {
      if (!err && resp.statusCode === 200) {
        var data = JSON.parse(body).response.venues;

        data = _.filter(data, function(element) {
          return element.hasMenu && emptyMenus.getData(element.id) === undefined;
        });

        res.send(data);
      }
    });
  }
};
