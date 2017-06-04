// Server Side

// requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

// globals
var port = 8000;
var config = {
  database: 'todoDB',
  host: 'localhost',
  port: 5432, // default port for localhost postgres databases
  max: 10
};

var pool = new pg.Pool(config);

// uses
app.use(express.static('public'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// spin up server
app.listen(port, function(){
  console.log('The server is up on port: ', port);
});

// base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('views/index.html'));
});//end of base url

//get route
// app.get()
