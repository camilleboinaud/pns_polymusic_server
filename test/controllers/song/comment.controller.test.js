var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
//var winston = require('winston');


describe('Routing', function() {
  var url = 'http://localhost:3000';

  describe('Comment', function() {
    it('should return success with message', function(done) {

      var comment = {
        songId:'56b54c2a2fa4b5d127fb47e7',
        content:'test This is so BAD',
        userId:'56aff61f6b606bab196aae5d',
        userName:'sth'
      };

      request(url)
        .post('/api/comments')
        .send(comment)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.status.should.be.equal(200);
          res.body.should.have.property('message');
          done();
        });
    });


  });
});
