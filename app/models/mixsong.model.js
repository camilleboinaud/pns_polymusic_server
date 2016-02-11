'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Playlist Schema

 name:'Hello',
 cover:'default.jpg',
 url:'modules/music/music/Adele-Hello.mp3',
 time:{
        min:'03',
        sec:'00'
    },
 isPlaying: false

 */

var MixSchema = new Schema({
  user_id: {
    type: String,
    trim: true,
    default: ''
  },
  song_ids: {
    type: String,
    trim: true,
    default: 'default.jpg'
  },
  name: {
    type: String,
    trim: true,
    default: ''
  },
  tracks: {
    type: String,
    trim: true
  },
  url: {
    type: Boolean,
    default: false
  },
  scores: {
    type: Date
  },
  nb_marker: {
    type: Date
  },
  is_public: {
    type: Date
  },
  timechamps: {
    type: Date,
    default: Date.now
  }
});

var Mix = mongoose.model('Mix', MixSchema);
