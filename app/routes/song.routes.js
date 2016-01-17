/**
 * Created by sth on 1/15/16.
 */
'use strict';

module.exports = function (app) {
  // User Routes
  var song = require('../controllers/song/song.controller.js');

  // Setting up the users profile api
  app.post('/api/song', song.songsUpload);
  app.get('/api/song/playlist', song.getPlaylist);
  app.post('/api/song/hello',song.hello)

};
