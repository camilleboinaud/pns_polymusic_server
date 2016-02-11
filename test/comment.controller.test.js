var should = require('should'),
  assert = require('assert'),
  request = require('supertest'),
  app = require('./app-test.js'),
  mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  User = mongoose.model('User'),
  Comment = mongoose.model('Comment');


describe('Routing', function() {
  var url = 'http://localhost:3000',
    user_test = {
      username: 'user_test',
      email: 'user_test@email.com',
      password: 'password'
    },
    song_test = {
      name:'song_test',
      author:'author_test',
      path: 'path_test'
    },
    user,
    song;

  before(function (done){
    user = new User(user_test);
    song_test.owner = user._id;
    song = new Song(song_test);
    user.save();
    song.save();
    done()
  });

  after(function (done) {
    user.remove();
    song.remove();
    done();
  });


  describe('Comment', function() {
    it('should return success with message', function(done) {
      var comment_test = {
        songId:song._id,
        content:'test This is so BAD',
        userId: user._id,
        userName:'sth'
      };
      request(url)
        .post('/api/comments')
        .send(comment_test)
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
