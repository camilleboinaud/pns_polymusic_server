'use strict'

var session = require('express-session');

exports.isAuthenticated = function(request, result, callback){
  if (!session.user) {
    result.send('You are not authorized to view this page');
  } else {
    callback();
  }
}
