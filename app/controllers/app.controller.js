/**
 * Created by sth on 1/15/16.
 */





/**
 * Module dependencies.
 */
var _ = require('lodash'),
  express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');


/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./song/song.controller.js')
);


/**
 * root route reply Welcome PolyMusic
 * @param app
 */
module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res) {
  res.send('Welcome PolyMusic');
});
