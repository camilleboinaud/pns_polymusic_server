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
  if (req.query.name){
    query.name = new RegExp(req.query.name);
  }
  Song.find(query).sort().exec(function(err,songs){
    if(err) {
      console.info(err);
    } else{
      res.jsonp(songs);
    }
  });
};
