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
  var query = req.query;
  Song.find(query).sort().exec(function(err,songs){
    if(err) console.info(err);
    res.jsonp(songs);
  });
};


exports.getCommentsBySongId = function (req, res) {
  console.log('############ GET COMMENTS ############');
  var songId = req.params.songId,
    query = req.query;
  Comment.find({song_id:songId}).limit(1).exec(function (err, comments) {
    res.json(comments);
  });
};
