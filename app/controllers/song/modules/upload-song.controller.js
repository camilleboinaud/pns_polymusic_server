/**
 * Created by sth on 1/15/16.
 */
'use strict';
var express = require('express'),
  fs = require('fs'),
  mime = require('mime'),
  mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  path = require('path'),
  app = express(),
  multer = require('multer'),
  songSavePath = 'public/uploads/songs/',
  storage = multer.diskStorage({
    destination:songSavePath,
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  }),
  upload = multer({
    storage: storage
  });

/**
 * Songs upload handle function
 * @param req
 * @param res
 */
exports.songsUpload = function(req, res) {
  console.log('############ Music Upload ############');

  upload.single('file')(req,res,function(error){
    if(error){
      console.error(error);
      res.status(400).send({
        error:error
      });
      throw error;
    }
    var file = req.file,
      song = new Song(req.body);

    // save song into db
    console.info('url: '+file.path);
    // Add missing user fields
    song.isPlaying = false;
    song.url = path.join(__dirname,'../../../../'+songSavePath+ file.originalname);
    song.name = file.originalname;

    // Then save the user
    song.save(function (err) {
      if (err) {
        return res.status(400).jsonp({
          message: err
        });
      } else {
        // Remove sensitive data before login
        // success
        res.jsonp({
          message: 'File saved successfully.'
        });
        console.log(file.originalname+' is saved!');
      }
    });
  });
};
