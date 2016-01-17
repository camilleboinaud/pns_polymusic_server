/**
 * Created by sth on 1/15/16.
 */
'use strict';

module.exports = function (app) {
  // User Routes
  var song = require('../controllers/song/song.controller.js');

  // Setting up the users profile api
  app.post('/api/songs', song.songsUpload);
  app.get('/api/songs', song.getPlaylist);
  app.get('/api/songs/:id', song.songDownload);
  app.post('/api/songs/hello',song.hello)

};
