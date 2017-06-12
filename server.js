// ===========================================================================
// server.js
// @description: Setup server, register routes and swagger, start up express server.
// ===========================================================================

// packages
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// app variables
var app = express(); // define our app using express
var config = require('./config');
var port = config.originPort || process.env.PORT; // set our port

// =========================================================================
// Express Config
// =========================================================================

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// =========================================================================
// Load Modules
// =========================================================================

var routes = require('./router')(app);

// =========================================================================
// Server Start
// =========================================================================

app.listen(port);
console.log('Express available at '+config.origin+':'+config.originPort);
module.exports = app;
