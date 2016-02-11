'use strict';

var mongoose = require('mongoose'),
  Song = mongoose.model('Song');

exports.getSongById = function(req, res) {
  console.log('############ GET SONG ############');
  var id = req.params.id;
  Song.findById(id, function (err, found) {
    console.info(found);
    if(found){
      res.jsonp(found);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
};

exports.getTracksBySongId = function(req, res) {
  console.log('############ GET SONG\'S ALL TRACKS ############');
  var id = req.params.id;
  Song.findById(id, function (err, found) {
    console.info(found);
    if(found){
      res.jsonp(found.tracks);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
};


exports.getTrackById = function(req, res) {
  console.log('############ GET TRACK ############');
  var songId = req.params.songId,
    trackId = req.params.trackId;
  Song.findById(songId, function (err, found) {
    if(found){
      found.tracks.forEach(function (track) {
        if (track._id == trackId){
          res.sendFile(track.path);
        }
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
};
