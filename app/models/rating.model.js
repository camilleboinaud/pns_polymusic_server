/**
 * Created by sth on 1/28/16.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RatingSchema = new Schema({
  song_id: {
    type: Schema.ObjectId,
    required: true
  },
  user_id: {
    type: Schema.ObjectId,
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

var Rating = mongoose.model('Rating', RatingSchema);

