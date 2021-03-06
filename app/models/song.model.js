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
var TrackSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: 'unknown track'
  },
  path: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  }
});

var SongSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: 'unknown'
  },
  author: {
    type: String,
    trim: true,
    default: 'unknown'
  },
  owner: {
    type: Schema.ObjectId,
    required: true
  },
  path: {
    type: String,
    trim: true
  },
  is_pub: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  tracks: [TrackSchema],
  nbComment: {
    type: Number,
    default: 0
  },
  nbRating: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  is_song: {
    type: Boolean,
    default: true
  }
});

var Song = mongoose.model('Song', SongSchema);
