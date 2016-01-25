var express = require('express'),
  glob = require('glob'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  multer = require('multer');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  }));

  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  /**
   * require app controller
   */
  var controller = config.root + '/app/controllers/app.controller.js';
  require(controller)(app);

  /**
   * require app routes
   */
  var routes = glob.sync(config.root + '/app/routes/*.js');
  routes.forEach(function (route) {
    require(route)(app);
  });

  /**
   * Setting for multer
   */
  var uploads = multer({
    dest: config.root + '/public/uploads/',
    inMemory: true
  });

  /**
   * Cross domain
   */
  app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Allow-Origin', '*');

      res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Cache-Control, Accept');
      console.log('set cross header for ' + req.method);

      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
      } else {
        next(req, res);
      }
    }
  );


  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
