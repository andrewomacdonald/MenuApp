var bookshelf = require('../schema.js').bookshelf;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = bookshelf.Model.extend({

  tableName: 'users',

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  comparePassword: function(userEnteredPassword, callback) {
    var savedPassword = this.get('password');
    console.log(savedPassword);
    console.log(userEnteredPassword);
    bcrypt.compare(userEnteredPassword, savedPassword, function(err, isMatch) {
      if(err) {
        throw err;
      } else {
        callback(null, isMatch);
      }
    });
  },

  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
    }
})


module.exports = User;
