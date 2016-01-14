var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pns-polymusic-server'
    },
    port: 3000,
    db: 'mongodb://localhost/pns-polymusic-server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'pns-polymusic-server'
    },
    port: 3000,
    db: 'mongodb://localhost/pns-polymusic-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'pns-polymusic-server'
    },
    port: 3000,
    db: 'mongodb://localhost/pns-polymusic-server-production'
  }
};

module.exports = config[env];
