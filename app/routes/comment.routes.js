/**
 * Created by sth on 1/25/16.
 */
'use strict';

module.exports = function (app) {
  // User Routes
  var comment = require('../controllers/comment/comment.controller.js');

  // Setting up the users profile api
  app.post('/api/comments', comment.writeNewComment);

};
