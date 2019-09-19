const express = require('express'); //express to work with http requests
const morgan = require('morgan'); //logging
const cors = require('cors'); //allow requests made to a different origin in a browser
const helmet = require('helmet'); //helmet hides some info in header to help prevent malicious attacks

const movies = require('./movies-data-small.json'); //data for app

const app = express(); //create express app

//use middelware in app
app.use(morgan('dev')); 
app.use(cors()); 
app.use(helmet()); 

/*** endpoints ***/
//movie endpoint allows for movies to be searched for by genre, country, or avg_both query params
//otherwise API will respond with an array of full movie entries
app.get('/movie', handleGetMovie);

/*** callback functions for endpoints ***/

//endpoint only responds when given a valid auth header with a Bearer API token value

//

module.exports = app; //allow other files to use app