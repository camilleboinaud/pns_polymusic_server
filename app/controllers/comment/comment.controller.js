/**
 * Created by sth on 1/25/16.
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
  require('./manage-comment.controller.js'),
  require('./rating.controller.js')
);
