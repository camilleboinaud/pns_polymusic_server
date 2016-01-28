/**
 * Created by sth on 1/28/16.
 */
'use strict';
var mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  Comment = mongoose.model('Comment');

exports.rating = function (req, res) {
  console.log('############ Rating ############');

};
