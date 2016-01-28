/**
 * Created by sth on 1/25/16.
 */

'use strict';
var express = require('express'),
  mongoose = require('mongoose'),
  Comment = mongoose.model('Comment'),
  Song = mongoose.model('Song'),
  path = require('path');


/**
 * Get playlist handle function
 * @param req
 * @param res
 */
exports.writeNewComment = function(req, res) {
  console.log('############ NEW COMMENT ############');
  var body = req.body,
    songId = body.songId,
    content = body.content,
    comment = new Comment();

  comment.content = content;

  Song.findById(songId, function (err, song) {
    if(song){
      comment.song_id = mongoose.Types.ObjectId(songId);
      comment.save(function (err) {
        if (err) {
          res.status(400).json({
            message: err
          });
          throw err;
        }
        song.comments.push(comment);
        song.save(function (err) {
          if (err) {
            res.status(400).json({
              message: err
            });
            throw err;
          }
          res.json({
            message: 'commit: '+ content + '. saved successfully.'
          });
          console.log('commit: '+ content +' is saved!');
        });

      });

    } else {
      res.status(400).json({
        message: 'songId: '+songId+'is not existed'
      });
    }
  });
};


exports.getCommentsBySongId = function (req, res) {
  console.log('############ GET COMMENTS ############');
  var songId = req.params.songId,
    query = {song_id:songId},
    limit,
    pageIndex;

  if (req.query.limit){
    limit = parseInt(req.query.limit);
  }


  if (req.query.pageIndex){
    pageIndex = parseInt(req.query.pageIndex);
    Comment.find(query).sort('-timechamps').skip((pageIndex-1)*limit).limit(limit).exec(function (err, comments) {
      res.json(comments);
    });
  } else {
    if(req.query.lastTimeChamps){
      query.timechamps = { $lt:req.query.lastTimeChamps};
    }
    Comment.find(query).sort('-timechamps').limit(limit).exec(function (err, comments) {
      res.json(comments);
    });
  }

};

exports.getNbPages = function (req, res) {
  console.log('############ GET NG PAGES ############');
  var query = {},
    limit = parseInt(req.query.limit),
    nbPages = 1;
  if (req.query.songId){
    query.song_id = req.query.songId;
  }

  Comment.count(query, function (err, c) {
    if(limit){
      nbPages = Math.ceil(c/limit);
    }
    if (nbPages == 0){
      nbPages = 1;
    }
    res.json({
      nbPages: nbPages
    })
  })
};
