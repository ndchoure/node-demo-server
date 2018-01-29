var express = require('express');
var bodyParser = require('body-parser');
// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

//Create express app
var app = express();
//Create a route
var router = express.Router();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.connect(dbConfig.url, {
    //useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

//Define middleware to use for all requests
router.use(function(req, res, next){
    //Do logging
    console.log('Something is happening');
    next();// Make sure we go to the next route after this
});

// define a simple route
router.get('/', function(req, res){
    res.json({"message": "Welcome to Adoptions."});
});

//Our new routes
app.use('/api', router);

// Require routes
require('./app/routes/media_type.routes.js')(router);  

var port = process.env.port || 8080; //Set a port
// listen for requests
app.listen(port, function(){
    console.log("Adoptions server is listening on port " + port);
});
