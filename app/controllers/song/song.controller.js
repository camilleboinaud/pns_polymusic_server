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
  require('./modules/manage.controller.js'),
  require('./modules/upload-song.controller.js'),
  require('./modules/download-song.controller.js')
);
