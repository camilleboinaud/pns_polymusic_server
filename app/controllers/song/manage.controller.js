'use strict';
var mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  Comment = mongoose.model('Comment'),
  fs = require('fs');


/**
 * Get playlist handle function
 * @param req
 * @param res
 */
exports.getPlaylist = function(req, res) {
  console.log('############ GET PLAYLIST ############');
  var query = {};
  if (!req.query.userId) {
    query.is_pub = true;
    if (req.query.string){
      query.$or = [
        {name: new RegExp(req.query.string)},
        {author: new RegExp(req.query.string)}
      ];
    }
  } else {
    if (req.query.string){
      query.$and = [
        {$or: [
          {is_pub: true},
          {$and:[{owner:req.query.userId},{is_pub: false}]}
        ]},
        {$or: [
          {name: new RegExp(req.query.string)},
          {author: new RegExp(req.query.string)}
        ]}
      ];
    } else {
      query.$or = [
        {is_pub: true},
        {$and:[{owner:req.query.userId},{is_pub: false}]}
      ];
    }
  }

  if (req.query.isSong) {
    query.is_song = req.query.isSong;
  }

  Song.find(query).sort('-created').exec(function(err,songs){
    if(err) {
      console.info(err);
    } else{
      res.json(songs);
    }
  });
};


exports.deleteSongById = function (req, res) {
  console.log('############ DELETE SONG ############');
  var songId = req.params.songId,
    userId = req.query.userId;
  Song.findById(songId, function (err, found) {
    if(found && (found.owner == userId)){
      // syn delete
      deleteFolderRecursive(found.path);
      found.remove(function (err) {
        res.json({
          state: true,
          message:"song "+found.name+" is deleted"
        });
      })
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
};

exports.updateSongById = function (req, res) {
  console.log('############ UPDATE SONG ############');
  var songId = req.params.songId,
    userId = req.body.userId,
    isPub = req.body.isPub;
  Song.findById(songId, function (err, found) {
    if(found && (found.owner == userId)){
        found.is_pub = isPub;
        found.save(function (err) {
          res.json({
            message:"song update success"
          });
        });
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
};

exports.getSongsByUser = function (req, res) {
  console.log('############ GET SONGS BY USER ############');
  var userId = req.params.userId,
    query = {};
  query.owner = userId;
  console.log(query);
  Song.find(query).sort('-created').exec(function (err, songs) {
    if(err) {
      console.info(err);
    } else{
      res.json(songs);
    }
  })
};

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
