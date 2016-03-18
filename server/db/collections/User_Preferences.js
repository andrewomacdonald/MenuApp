var bookshelf = require('../schema.js');
var User_Preference = require('/../models/User_Preference.js');

var User_Preferences = new bookshelf.collection();
User_Preferences.model = User_Preference;
module.exports = User_Preferences;
