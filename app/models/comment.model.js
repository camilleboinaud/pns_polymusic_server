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
    default: 'unknown'
  },
  user_id: {
    type: String,
    trim: true,
    default: 'default.jpg'
  },
  mix_id: {
    type: String,
    trim: true,
    default: ''
  },
  timechamps: {
    type: Date,
    default: Date.now
  }
});

var Comment = mongoose.model('Comment', CommentSchema);
