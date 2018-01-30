//Module dependecies
const express = require('express');
const bodyParser = require('body-parser');

// Configuring the database
const config = require('./config/config.js');
const mongoose = require('mongoose');
const logger = require('morgan');
const errorHandler = require('errorHandler');

//Create express app
const app = express();
//Create a route
const router = express.Router();

//Connect to Database 
mongoose.Promise = global.Promise;
mongoose.connect(config.db.mlab_url, {
    //useMongoClient: true
});

mongoose.connection.on('error', (err) => {
    console.err(err);
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', () => {
    console.log("Successfully connected to the database");
})

//Express configuration
app.set('host', config.server.host || '0.0.0.0')
app.set('port', process.env.PORT || config.server.port || 8080); //Set a port

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(looger('dev'));
app.use(errorHandler());

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

// listen for requests
app.listen(app.get('port'), () => {
    console.log(`Adoptions server is listening on port  ${app.get('port')}`);
    console.log('Press CTRL-C to stop\n');
});
