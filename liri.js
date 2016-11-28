//----------------------------------------------------------//
//            Requirements and Global Variables             //
//----------------------------------------------------------//

//requried NPMs
var spotify = require("spotify");
var twitter = require("twitter");
var request = require("request");
var fs = require("fs");

//keys for twitter
//var keys = require('./keys.js');

//interactions for liri
var liriCommand = process.argv[2];
var liriString = process.argv;
var liriRequestedItem = "";

// movie variables
var queryURL;


//----------------------------------------------------------//
//                  String Argv Together                    //
//----------------------------------------------------------// 
// an empty string for holding requested song or movie

// Capture all the words in the requested item
for (var i = 3; i < liriString.length; i++) {

  // Build a string with the requested item name.
  liriRequestedItem = liriRequestedItem + " " + liriString[i];


}

liriRequestedItem = liriRequestedItem.trim();

//----------------------------------------------------------//
//            Liri  Movie-This controls                     //
//----------------------------------------------------------// 

// node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:

// Title of the movie.
// Year the movie came out.
// IMDB Rating of the movie.
// Country where the movie was produced.
// Language of the movie.
// Plot of the movie.
// Actors in the movie.
// Rotten Tomatoes Rating.
// Rotten Tomatoes URL.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!

if(liriCommand === "movie-this"){
	//if there is no input for lirirequested item
	if (liriRequestedItem.length ===0 ) {
		liriRequestedItem = "Mr.Nobody";
	}
	
	//url build for request
	queryURL = "http://www.omdbapi.com/?t="+ liriRequestedItem +"&y=&plot=short&r=json"
	console.log(queryURL)
	console.log(liriRequestedItem)
	// runs a request to the OMDB API
	request(queryURL, function(error, response, body) {

	  // If the request is successful
	  if (!error && response.statusCode === 200) {
			console.log(JSON.parse(body));
		    
		    // Title of the movie.
		    console.log("The movie's title is: " + JSON.parse(body).Title);
			
			// Year the movie came out.
			console.log("The movie's release year is: " + JSON.parse(body).Year);
			
			// IMDB Rating of the movie.
			console.log("The movie's rating is: " + JSON.parse(body).Rated);
			
			// Country where the movie was produced.
			console.log("The movie's country of production is: " + JSON.parse(body).Country);
			
			// Language of the movie.
			console.log("The movie's language is: " + JSON.parse(body).Language);
			
			// Plot of the movie.
			console.log("The movie's plot is: " + JSON.parse(body).Plot);
			
			// Actors in the movie.
			console.log("The movie's actors are: " + JSON.parse(body).Actors);
			
			// Rotten Tomatoes Rating.
			console.log("The movie's rotten tomatoes rating is: " + JSON.parse(body).imdbRating);
			
			// Rotten Tomatoes URL.
			console.log("The movie's rotten tomatores URL is: " + JSON.parse(body).imdbRating);




		}
	});












}





//----------------------------------------------------------//
//            Liri  Spotify-This controls                   //
//----------------------------------------------------------//



//----------------------------------------------------------//
//            Liri  Twitter-This controls                   //
//----------------------------------------------------------//



//----------------------------------------------------------//
//            Liri  Do-This controls                        //
//----------------------------------------------------------//
