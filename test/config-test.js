var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = 'test';

var config = {
  test: {
    root: rootPath,
    app: {
      name: 'pns-polymusic-server'
    },
    port: 3000,
    db: 'mongodb://localhost/pns-polymusic-server-test'
  }
};

module.exports = config[env];
