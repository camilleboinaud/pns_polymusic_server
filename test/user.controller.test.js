'use strict';

var should = require('should'),
  assert = require('assert'),
  request = require('supertest'),
  app = require('./app-test.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

describe('user management test', function(){

  var url = 'http://localhost:3000';
  var user;

  describe('registering test cases', function(){

    var user_test = {
      username: 'user_test',
      email: 'user_test@email.com',
      password: 'password'
    }, requestBody = {
      username: 'my_username',
      email: 'firstname.lastname@email.com',
      password: 'azerty'
    };

    before(function (done){
      user = new User(user_test);
      done()
    });

    after(function (done) {
      user.remove();
      done();
    });


    it('test register', function(done){
      request(url)
        .post('/register')
        .send(requestBody)
        .end(function(error, result){
          if(error){
            throw error;
          }
          result.status.should.be.equal(200);
          result.body.should.have.property('success');
          result.body.should.have.property('message');
          result.body.should.have.property('user');
          result.body.success.should.be.equal(true);
          User.findById(result.body.user._id, function (err, found) {
            if(err) {
              throw err;
            }
            found.remove();
          });
          done();
        });
    });

    it('test body answer : using same email twice', function(done){

      var requestBody2 = {
        username: user_test.username+'2',
        email: user_test.email,
        password: user_test.password
      };

      request(url)
        .post('/register')
        .send(requestBody2)
        .end(function(error, result) {
          if (error) {
            throw error;
          }
          result.status.should.be.equal(400);
      });
      done();
    });
  });

});
