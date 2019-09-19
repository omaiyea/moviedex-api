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
//app.use(validateToken);
/*** endpoints ***/
//movie endpoint allows for movies to be searched for by genre, country, or avg_vote query params
//otherwise API will respond with an array of full movie entries
app.get('/movie', handleGetMovies);

/*** callback functions for endpoints ***/
function handleGetMovies(req, res){
    const { genre = "", country = "", avg_vote = "" } = req.query; //todo; add validation
    if(avg_vote && isNaN(avg_vote)){
        return(res.status(400).send('Please provide a number for avg_vote'));
    }
    let results = movies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
    results = results.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()));
    results = results.filter(movie => movie.avg_vote >= avg_vote);

    res.status(200).json(results);
}
//endpoint only responds when given a valid auth header with a Bearer API token value
/*function validateToken(req, res, next){
    
}*/

module.exports = app; //allow other files to use app