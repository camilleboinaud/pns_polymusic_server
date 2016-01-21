/**
 * Created by sth on 1/15/16.
 */
'use strict';

module.exports = function (app) {

  var user = require('../controllers/user/user.controller.js'),
      authentication = require('../middleware/authentication.middleware.js');

  app.post('/login', user.login);
  app.post('/register', user.register);
  app.post('/logout', authentication.isAuthenticated, user.logout);
  //app.post('/isLoggedIn', user.isLoggedIn);

};
