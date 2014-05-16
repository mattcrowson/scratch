module.exports = function(app) {
  var express = require('express');
  var router  = express.Router();
  var Todo    = require('../models/todo');

  router.get('/', function(req, res) {
    Todo.find(function(err, result) {
      res.send({result: result});
    });
  });

  router.get('/:author', function(req, res) {
    Todo.findOne({'author': req.params.author}, function(err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.send({result: result});
      }
    });
  });

  router.post('/', function(req, res, next) {
    new Todo({action: req.body.action, author: req.body.author}).save();
    res.send({'new todo' : req.body.action});
  });

  // accessed at GET http://host:port/todos
  app.use('/todos', router);
}
