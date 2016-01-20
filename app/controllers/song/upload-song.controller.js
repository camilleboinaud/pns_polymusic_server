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
  multer = require('multer'),
  savePath = 'public/uploads/songs/',
  storage = multer.diskStorage({
    destination:savePath,
    filename: function (req, file, cb) {
      file.originalname = decodeURIComponent(file.originalname);
      console.info(file.originalname);
      var folderPath = path.join(__dirname,'../../../'+ savePath +file.fieldname);
      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
      }
      cb(null, file.fieldname+'/'+file.originalname)
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
  upload.any()(req,res,function(error){
    if(error){
      console.error(error);
      res.status(400).send({
        error: error
      });
      throw error;
    }
    var tracks = req.files,
      songName = req.body.name,
      song = new Song(req.body),
      isValid = true;

    // It is synchronously
    tracks.forEach(function(trackFile){
      if (trackFile.fieldname !== songName){
        res.status(404).send({
          error: 'fieldname and song\'s name are different'
        });
        isValid = false;
      } else {
        // save song into db
        console.info('url: '+trackFile.path);
        var track = {};
        // Add missing user fields
        track.path = path.join(__dirname,'../../../'+trackFile.path);
        track.name = trackFile.originalname;
        song.tracks.push(track);
      }
    });

    if(isValid){
      song.path = path.join(__dirname,'../../../' + savePath + songName);

      // track is saves so we can get id
      // add url
      song.tracks.forEach(function (track) {
        track.url = song._id+'/tracks/'+track._id;
      });

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
          console.log(songName +' is saved!');
        }
      });
    }


  });
};
