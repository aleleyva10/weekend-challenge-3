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
  database: 'todolist',
  host: 'localhost',
  port: 5432, // default port for localhost postgres databases
  max: 10
};

var pool = new pg.Pool(config);

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// spin up server
app.listen(port, function() {
  console.log('The server is up on port: ', port);
});

// base url
app.get('/', function(req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('views/index.html'));
}); //end of base url

//get task
app.get('/getTask', function(req, res) {
  console.log('get hit to /getTask');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.sendStatus(400);
    } else {
      var allTasks = [];
      var resultSet = connection.query('SELECT * FROM tasks_to_do');
      resultSet.on('row', function(row) {
        allTasks.push(row);
      });
      resultSet.on('end', function() {
        done();
        res.send(allTasks);
      });
    }
  }); //end pool.connect
}); //end get task

// post task
app.post('/getTask', function(req, res){
console.log('post hit to /getTask: ', req.body);
pool.connect(function(err, connection, done) {
  if (err) {
    console.log('error');
    done();
    res.sendStatus(400);
  } else {
   connection.query('INSERT INTO tasks_to_do(tasks, description) values ($1, $2)', [req.body.task, req.body.description]);
   done();
      res.send(200);
    };
  }); //end pool.connect
}); //end get task
