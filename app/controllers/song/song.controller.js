/**
 * Created by sth on 1/15/16.
 */
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./manage.controller.js'),
  require('./upload-song.controller.js'),
  require('./download-song.controller.js')
);
