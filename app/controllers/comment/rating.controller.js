'use strict';
var mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  Rating = mongoose.model('Rating');

exports.rating = function (req, res) {
  console.log('############ Rating ############');
  var userId = mongoose.Types.ObjectId(req.body.userId),
    songId = mongoose.Types.ObjectId(req.body.songId),
    rating = req.body.rating,
    ratingModel;
  Rating.findOne({ 'song_id': songId, 'user_id':userId }, function (err, doc) {
    if (err) {
      res.status(400).json({
        message: err
      });
      throw err;
    }

    Song.findById(songId, function (err, song) {
      if (err) {
        res.status(400).json({
          message: err
        });
        throw err;
      }
      if(!song){
        res.status(404).json({
          message: 'song not found'
        });
      } else {
        if(!doc){
          // new
          ratingModel = new Rating();
          ratingModel.song_id = songId;
          ratingModel.user_id = userId;
          ratingModel.rating = rating;
          song.nbRating++;
          song.rating = (song.rating * (song.nbRating - 1) + ratingModel.rating) / song.nbRating ;
        } else {
          //update
          ratingModel = doc;
          song.rating = (song.rating * song.nbRating - ratingModel.rating + rating) / song.nbRating ;
          ratingModel.rating = rating;
        }


        song.save();
        ratingModel.save(function (err) {
          if (err) {
            res.status(400).json({
              message: err
            });
            throw err;
          }

          console.log('rating: songId:'+ songId + ',userId:'+ userId+',rating:'+rating+'. saved successfully.');
          res.json({
            nbRating: song.nbRating,
            rating: Math.ceil(song.rating),
            message: 'rating: songId:'+ songId + ',userId:'+ userId+',rating:'+rating+'. saved successfully.'
          });
        });
      }
    });
  });
};

exports.getRating = function (req, res) {
  console.log('############ GET RATING ############');
  var userId = mongoose.Types.ObjectId(req.query.userId),
    songId = mongoose.Types.ObjectId(req.query.songId);
  Rating.findOne({ 'song_id': songId, 'user_id':userId }, function (err, doc) {
    if (err) {
      res.status(400).json({
        message: err
      });
      throw err;
    }
    if (doc) {
      res.json(doc);
    } else {
      res.status(404);
      res.end();
    }
  });

};
