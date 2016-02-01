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
    query = req.query;
  Comment.find({song_id:songId}).exec(function (err, comments) {
    res.json(comments);
  });
};
