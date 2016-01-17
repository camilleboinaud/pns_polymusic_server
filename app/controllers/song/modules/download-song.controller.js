/**
 * Created by sth on 1/17/16.
 */
'use strict';

var mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  express = require('express'),
  path = require('path');

exports.songDownload = function(req, res) {
  console.log('############ Music Download ############');
  var id = req.params.id;
  Song.findById(id, function (err, found) {
    console.info(found);
    if(found){
      res.sendFile(found.path);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

};
