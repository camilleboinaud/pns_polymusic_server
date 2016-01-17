/**
 * Created by sth on 1/15/16.
 */
'use strict';
var express = require('express'),
  mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  path = require('path'),
  app = express();


/**
 * Get playlist handle function
 * @param req
 * @param res
 */
exports.getPlaylist = function(req, res) {
  console.log('############ GET PLAYLIST ############');
  Song.find({}).sort().exec(function(err,songs){
    if(err) console.info(err);
    console.log('get songs:');
    console.info(songs);
    res.jsonp(songs);
  });
};


exports.hello = function (req, res) {
  console.log('############ HEllo ############');
  res.jsonp({
    hello:'world'
  });
};
