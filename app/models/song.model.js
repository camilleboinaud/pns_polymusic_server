/**
 * Created by sth on 1/11/16.
 */
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
var TimeSchema = new Schema({
  min: {
    type: Number,
    trim: true,
    min: 0,
    default: 0
  },
  sec: {
    type: Number,
    trim: true,
    min: 0,
    max: 60,
    default: 0
  }
});

var SongSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: 'unknown'
  },
  cover: {
    type: String,
    trim: true,
    default: 'default.jpg'
  },
  url: {
    type: String,
    trim: true,
    default: ''
  },
  time: [TimeSchema],
  isPlaying: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var Song = mongoose.model('Song', SongSchema);
