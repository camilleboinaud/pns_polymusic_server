/**
 * Created by sth on 1/15/16.
 */





/**
 * Module dependencies.
 */
var _ = require('lodash'),
  express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  session = require('express-session'),
  app = express();

app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));

/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./song/song.controller.js'),
  require('./user/user.controller.js')
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
