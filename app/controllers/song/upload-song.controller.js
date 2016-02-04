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
        var folderPath = path.join(__dirname,'../../../'+ savePath +req.body.songName);
        if (!fs.existsSync(folderPath)){
          fs.mkdirSync(folderPath);
        }
        cb(null, req.body.songName+'/'+file.originalname);
    }
  }),
  upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if(mime.lookup(file.originalname).indexOf('audio') != -1) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
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
      songName = req.body.songName,
      author = req.body.author,
      owner = req.body.owner,
      song = new Song(req.body);

    // It is synchronously
    tracks.forEach(function(trackFile){
      // save song into db
      console.info('url: '+trackFile.path);
      var track = {};
      // Add missing user fields
      track.path = path.join(__dirname,'../../../'+trackFile.path);
      track.name = trackFile.originalname;
      song.tracks.push(track);
    });

    song.path = path.join(__dirname,'../../../' + savePath + songName);
    song.name = songName;
    song.author = author;
    song.owner = mongoose.Types.ObjectId(owner);

    // track is saves so we can get id
    // add url
    song.tracks.forEach(function (track) {
      track.url = 'http://localhost:3000/api/songs/'+song._id+'/tracks/'+track._id;
    });

    // Then save the user
    song.save(function (err) {
      if (err) {
        res.status(400).json({
          message: err
        });
        throw err;
      } else {
        // Remove sensitive data before login
        // success
        res.json({
          message: songName + ' saved successfully.'
        });
        console.log(songName +' is saved!');
      }
    });

  });
};
