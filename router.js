// ===========================================================================
// router.js
// @description: Setup api routes.
// @authors: Steve Belovarich
// ===========================================================================
var express = require('express');
var config = require('./config');
var session = require('express-session');
var router = require('express').Router();

module.exports = function(app) {
  'use strict';

  // =========================================================================
  // ROUTER CONFIG
  // =========================================================================

  app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');

    if (req.method == 'OPTIONS' ) {
      res.status(200).send();
    }
    else {
      next();
    }

  });

  app.use(session({ secret: config.key, resave: true, saveUninitialized: false }));

  // =========================================================================
  // ROUTES
  // =========================================================================
  app.use('/', express.static(process.cwd() + '/src'));
  app.use('/api/event', require('./routes/event/event-router'))

  return router;

};
