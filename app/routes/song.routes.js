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
  app.get('/api/songs/:id', song.getSongById);
  app.get('/api/songs/:id/tracks', song.getTracksBySongId);
  app.get('/api/songs/:songId/tracks/:trackId', song.getTrackById);
  app.delete('/api/songs/:songId', song.deleteById);
  app.put('/api/songs/:songId', song.updateSongById);
  app.get('/api/users/:userId/songs', song.getSongsByUser);

};
