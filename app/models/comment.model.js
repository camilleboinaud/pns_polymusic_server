/**
 * Created by sth on 1/17/16.
 */
/**
 * Created by sth on 1/11/16.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: true
  },
  song_id: {
    type: Schema.ObjectId,
    required: true
  },
  user_id: {
    type: Schema.ObjectId,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  timechamps: {
    type: Date,
    default: Date.now
  }
});

var Comment = mongoose.model('Comment', CommentSchema);

