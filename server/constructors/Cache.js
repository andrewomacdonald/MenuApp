var moment = require('moment');

/*  Creates Cache for use on server box
 *
 *  refreshTime = time to remove from cache, format according to Moment.js: 'a month ago'
 *  maintenanceInterval = how often to check if data in the cache have exceeded the refresh time, in ms
 */

function Cache(refreshTime, maintenanceInterval) {
  this.refreshTime = refreshTime;
  this.maintenanceInterval = maintenanceInterval;
  this.storage = {};

  this.refresh(this.refreshTime, this.maintenanceInterval);
}

Cache.prototype.addData = function(dataId, data) {
  var date = moment().format('YYYYMMDD');

  this.storage[dataId] = [data, date];
};

Cache.prototype.getData = function(dataId) {
  return this.storage[dataId];
};

Cache.prototype.refresh = function(refreshTime, maintenanceInterval) {
  var that = this;
  setInterval(function() {
    for (var key in that.storage) {
      if (moment(that.storage[key][1], "YYYYMMDD").fromNow() === that.refreshTime) {
        delete that.storage[key];
      }
    }
  }, maintenanceInterval);
};

module.exports = Cache;
