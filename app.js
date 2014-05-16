var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config     = require('./config.json')[app.get('env')];

// defaults to pool size of 5
mongoose.connect(config.dbURL);

mongoose.set('debug', config.debug);

// parse application/json and application/x-www-form-urlencoded
app.use(bodyParser());

require('./routes')(app);

// Start the server
app.listen(config.port);

console.log(config.title + ' on port ' + config.port);
