'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var session = require('express-session');

exports.login = function(request, result){
  var post = request.body;

  User.findOne({ 'email': post.email }).exec(function(error, user){

    if(error || !user || !user.authenticate(post.password)){
      result.status(400).json({
        success: false,
        message: (error) ? error.message : "An error occured during authentication"
      })
    } else {
      session.user = user;
      result.json({
        success: true,
        message: user.username + ' has been logged in with success',
        user: user
      });
    }
  });
};

exports.register = function(request, result){
  var post = request.body,
    user = new User(post);

  user.save(function(error){

    if(error){
      result.status(400).json({
        success: false,
        message: error.message
      })
    } else {
      result.json({
        success: true,
        message: user.username + ' has been registered with success',
        user: user
      });
    }

  })


};

exports.logout = function(request, result){
  delete session.user;
  result.send(true);
};

exports.isLoggedIn = function(request, result){
  if(session.user) result.send(true);
  result.send(false);
};
