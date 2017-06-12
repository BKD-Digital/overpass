var router = require('express').Router();
var Controller = require('./event-controller');
var EventController = new Controller();

router.get('/', function(req, res){
  EventController.start(req, res);
});


module.exports = router;
