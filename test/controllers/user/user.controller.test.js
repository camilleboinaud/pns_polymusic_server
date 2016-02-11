'use strict';

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../../app-test.js');
var UserSchema = require('../../../app/models/user.model.js');
var User = mongoose.model('User');

describe('user management test', function(){

  var url = 'http://localhost:3000';
  var user;

  describe('registering test cases', function(){


    beforeEach(function(done){
      console.log('before each run\n');

      var requestBody = {
        username: 'my_username',
        email: 'firstname.lastname@email.com',
        password: 'azerty'
      };

      request(url)
        .post('/register')
        .send(requestBody)
        .end(function(error, result){
          if(error){
            throw error;
          }

          user = result;
          done();
        });

    });

    afterEach(function(done){
      console.log('after each run\n');
      User.findOne({'email': user.body.user.email}, function(err, usr){
        console.log(err);
        console.log(usr);
        usr.remove();
        done();
      });
    });

    it('test return status', function(done){
      user.status.should.be.equal(200);
      done();
    });

    it('test body answer : right behavior', function(done){
      user.body.should.have.property('message');
      user.body.should.have.property('success');
      user.body.should.have.property('user');

      user.body.success.should.be.equal(true);
      done();
    });

    it('test body answer : using same email twice', function(done){

      var requestBody = {
        username: 'my_username_2',
        email: 'firstname.lastname@email.com',
        password: 'azerty_2'
      };

      request(url)
        .post('/register')
        .send(requestBody)
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
