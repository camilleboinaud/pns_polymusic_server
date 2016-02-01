/**
 * Created by sth on 1/28/16.
 */
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
          ratingModel = new Rating();
          ratingModel.song_id = songId;
          ratingModel.user_id = userId;
          ratingModel.rating = rating;
        } else {
          ratingModel = doc;
          ratingModel.rating = rating;
        }
        ratingModel.save(function (err) {
          if (err) {
            res.status(400).json({
              message: err
            });
            throw err;
          }

          console.log('rating: songId:'+ songId + ',userId:'+ userId+',rating:'+rating+'. saved successfully.');
          res.json({
            message: 'rating: songId:'+ songId + ',userId:'+ userId+',rating:'+rating+'. saved successfully.'
          });
        });
      }


    });

  });


};
