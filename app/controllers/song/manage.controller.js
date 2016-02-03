/**
 * Created by sth on 1/15/16.
 */
'use strict';
var mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  Comment = mongoose.model('Comment');


/**
 * Get playlist handle function
 * @param req
 * @param res
 */
exports.getPlaylist = function(req, res) {
  console.log('############ GET PLAYLIST ############');
  var query = {};
  if (req.query.string){
    query.$or = [
      {name: new RegExp(req.query.string)},
      {author: new RegExp(req.query.string)}
    ];
  }
  if (req.query.userId){
    query.owner = req.query.userId
  }
  if (req.query.isSong) {
    query.is_song = new RegExp(req.query.isSong);
  }
  console.info(query);
  Song.find(query).sort('-created').exec(function(err,songs){
    if(err) {
      console.info(err);
    } else{
      res.jsonp(songs);
    }
  });
};


exports.deleteById = function (req, res) {
  console.log('############ DELETE SONG ############');
  var songId = req.params.songId,
    userId = req.body.userId;
  Song.findById(songId, function (err, found) {
    if(found && (found.owner == userId)){
      found.remove(function (err) {
        res.json({
          message:"song "+found.name+" is deleted"
        });
      })
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
};
