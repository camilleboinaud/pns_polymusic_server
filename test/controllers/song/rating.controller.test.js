var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../../config-test.js');

describe('Routing', function() {
  var url = 'http://localhost:3000';

  before(function(done) {
    // In our tests we use the test db
    //console.info(config);
    //mongoose.connect(config.test);
    done();
  });


  describe('Rating', function() {
    it('should return song not found with message', function(done) {

      var rating_notfound = {
        'songId':'56b2766bdbc35bbbc1e5138f',
        'userId':'56aff6806b606bab196aae5e',
        'rating': 3
      };

      request(url)
        .post('/api/ratings')
        .send(rating_notfound)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.status.should.be.equal(404);
          res.body.should.have.property('message');
          res.body.message.should.equal('song not found');
          done();
        });
    });

    it('should return success with message', function(done) {

      var rating_success = {
        'songId':'56b8aa9bdf3d61b029b9f0cc',
        'userId':'56aff6806b606bab196aae5e',
        'rating': 3
      };

      request(url)
        .post('/api/ratings')
        .send(rating_success)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.status.should.be.equal(200);
          res.body.should.have.property('nbRating');
          res.body.should.have.property('rating');
          res.body.should.have.property('message');
          //res.body.rating.should.equal(3);
          done();
        });
    });


    it('rating 2 times should', function(done) {

      var rating_first = {
        'songId':'56b8aa9bdf3d61b029b9f0cc',
        'userId':'56aff6806b606bab196aae5e',
        'rating': 3
      },
        rating_second = {
          'songId':'56b8aa9bdf3d61b029b9f0cc',
          'userId':'56aff6806b606bab196aae5e',
          'rating': 4
        },
        ngRating,
        rating;

      request(url)
        .post('/api/ratings')
        .send(rating_first)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.status.should.be.equal(200);
          res.body.should.have.property('nbRating');
          res.body.should.have.property('rating');
          res.body.should.have.property('message');
          ngRating = res.body.nbRating;
          rating = res.body.rating;
          request(url)
            .post('/api/ratings')
            .send(rating_second)
            // end handles the response
            .end(function(err, res) {
              if (err) {
                throw err;
              }
              // this is should.js syntax, very clear
              res.status.should.be.equal(200);
              res.body.should.have.property('nbRating');
              res.body.should.have.property('rating');
              res.body.should.have.property('message');
              var raring_return = parseInt(res.body.rating);
              raring_return.should.equal(Math.ceil((rating*ngRating-3+4)/ngRating));
              res.body.nbRating.should.equal(ngRating);
              done();
            });
        });


    });


  });
});
