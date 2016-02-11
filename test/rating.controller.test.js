var should = require('should'),
  assert = require('assert'),
  request = require('supertest'),
  app = require('./app-test.js'),
  mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  User = mongoose.model('User');

describe('rating manager test', function() {
  var url = 'http://localhost:3000',
    song_test = {
      name:'song_test',
      author:'author_test',
      path: 'path_test'
    },
    user_test = {
      username: 'user_test',
      email: 'user_test@email.com',
      password: 'password'
    },
    user = new User(user_test),
    song;
  song_test.owner = user._id;
  song = new Song(song_test);

  before(function(done) {
    user.save();
    song.save(function(error){
      if (error) {
        throw error;
      }
    });
    done();
  });

  after(function() {
    song.remove();
    user.remove();
  });


  describe('Rating', function() {
    it('should return song not found with message', function(done) {

      var rating_notfound = {
        'songId':'56b4c518d2633efe0816c891',
        'userId':user._id,
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
        'songId':song._id,
        'userId':user._id,
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
        'songId': song._id,
        'userId': user._id,
        'rating': 3
      },
        rating_second = {
          'songId': song._id,
          'userId': user._id,
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
