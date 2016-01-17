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
    song.url = songSavePath+ file.originalname;
    song.name = file.originalname;

    // Then save the user
    song.save(function (err) {
      if (err) {
        return res.status(400).send({
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


  //console.info(req.file.buffer);
  //var file = req.file,
  //  path = 'modules/music/client/music/upload/',
  //  clientSidePath = 'modules/music/music/upload/',
  //  buffer = file.buffer,
  //  timeStamp = Date.now(),
  //  fileFullPath = path+timeStamp+'-'+file.originalname,
  //  errorMessage,
  //  song = new Song(req.body);
  //// audio/mpeg audio/x-ms-wma audio/vnd.rn-realaudio audio/x-wav
  //if(mime.lookup(file.originalname).indexOf('audio') !== -1){
  //  fs.writeFile(fileFullPath,buffer,function(error){
  //    if (error){
  //      errorMessage = 'Problem saving the file ' + file.name + '. Please try again.';
  //      res.status(400).send({
  //        message: errorMessage
  //      });
  //      console.log(errorMessage);
  //      throw error;
  //    }
  //
  //    // save song into db
  //    console.info('url: '+file.path);
  //    // Add missing user fields
  //    song.isPlaying = false;
  //    song.url = clientSidePath + timeStamp +'-'+ file.originalname;
  //    song.name = file.originalname;
  //    song.createdTimeStamp = timeStamp;
  //
  //    // Then save the user
  //    song.save(function (err) {
  //      if (err) {
  //        return res.status(400).send({
  //          message: err
  //        });
  //      } else {
  //        // Remove sensitive data before login
  //        // success
  //        res.jsonp({
  //          message: 'File saved successfully.'
  //        });
  //        console.log(fileFullPath+' is saved!');
  //      }
  //    });
  //
  //  });
  //} else {
  //  errorMessage = 'File\'s mime type is not an audio.';
  //  res.status(400).send({
  //    message: errorMessage
  //  });
  //  console.log(errorMessage);
  //}
};
