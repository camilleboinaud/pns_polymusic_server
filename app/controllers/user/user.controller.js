'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var session = require('express-session');

exports.login = function(request, result){
    var post = request.body;

    User.findOne({ 'email': post.email }).exec(function(error, user){

        if(!error && user && user.authenticate(post.password)){
            session.user = user;
            result.send(true);
        } else {
          result.send(false);
        }
    });
};

exports.register = function(request, result){
  var post = request.body,
    user = new User(post);

    user.save();
    result.send(true);
};

exports.logout = function(request, result){
    delete session.user;
    result.send(true);
};

exports.isLoggedIn = function(request, result){
  if(session.user) result.send(true);
  result.send(false);
};
