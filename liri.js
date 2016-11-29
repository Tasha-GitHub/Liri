//----------------------------------------------------------//
//            Requirements and Global Variables             //
//----------------------------------------------------------//

//requried NPMs
var spotify = require("spotify");
var twitter = require("twitter");
var request = require("request");
var fs = require("fs");

//keys for twitter
var keys = require('./keys.js');

//interactions for liri
var liriCommand = process.argv[2];
var liriString = process.argv;
var liriRequestedItem = "";

// movie variables
var queryURL;


//----------------------------------------------------------//
//                  String Argv Together                    //
//----------------------------------------------------------// 

// Capture all the words in the requested item
for (var i = 3; i < liriString.length; i++) {

  // Build a string with the requested item name.
  liriRequestedItem = liriRequestedItem + " " + liriString[i];
}

liriRequestedItem = liriRequestedItem.trim();

//----------------------------------------------------------//
//            Liri  Movie-This controls                     //
//----------------------------------------------------------// 

if(liriCommand === "movie-this"){
	movieStats();
	// //if there is no input for lirirequested item
	// if (liriRequestedItem.length ===0 ) {
	// 	liriRequestedItem = "Mr.Nobody";
	// }
	
	// //url build for request
	// queryURL = "http://www.omdbapi.com/?t="+ liriRequestedItem +"&y=&plot=short&r=json"
	// console.log(queryURL)
	// console.log(liriRequestedItem)
	// // runs a request to the OMDB API
	// request(queryURL, function(error, response, body) {

	//   // If the request is successful
	//   if (!error && response.statusCode === 200) {
	// 		console.log(JSON.parse(body));
	// 		console.log(response);
	// 	    // Title of the movie.
	// 	    console.log("The movie's title is: " + JSON.parse(body).Title);
			
	// 		// Year the movie came out.
	// 		console.log("The movie's release year is: " + JSON.parse(body).Year);
			
	// 		// IMDB Rating of the movie.
	// 		console.log("The movie's rating is: " + JSON.parse(body).Rated);
			
	// 		// Country where the movie was produced.
	// 		console.log("The movie's country of production is: " + JSON.parse(body).Country);
			
	// 		// Language of the movie.
	// 		console.log("The movie's language is: " + JSON.parse(body).Language);
			
	// 		// Plot of the movie.
	// 		console.log("The movie's plot is: " + JSON.parse(body).Plot);
			
	// 		// Actors in the movie.
	// 		console.log("The movie's actors are: " + JSON.parse(body).Actors);
			
	// 		// Rotten Tomatoes Rating.
	// 		console.log("The movie's rotten tomatoes rating is: " + JSON.parse(body).imdbRating);
			
	// 		// Rotten Tomatoes URL.
	// 		console.log("The movie's rotten tomatores URL is: " + JSON.parse(body).imdbRating);
	// 	}
	// });
}

function movieStats(){
	//if there is no input for lirirequested item
	if (liriRequestedItem.length ===0 ) {
		liriRequestedItem = "Mr.Nobody";
	}
	
	//url build for request
	queryURL = "http://www.omdbapi.com/?t="+ liriRequestedItem +"&y=&plot=short&r=json"
	// console.log(queryURL)
	// console.log(liriRequestedItem)
	// runs a request to the OMDB API
	request(queryURL, function(error, response, body) {
		if (error) {
			console.log(error);
		}

	  // If the request is successful
	  if (!error && response.statusCode === 200) {
			// console.log(JSON.parse(body));
			// console.log(response);
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

if(liriCommand === "spotify-this-song"){
	spotifySong();
	// //if there is no input for lirirequested item
	// if (liriRequestedItem.length ===0 ) {
	// 	liriRequestedItem = "The Sign";
	// }

	// spotify.search({ type: 'track', query: liriRequestedItem }, function(err, data) {
	    
	//     if ( err ) {
	//         console.log('Error occurred: ' + err);
	//         return;
	//     }
	    
	//     console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
	//     // Artist(s)
	//     console.log("The Artist of this song is " + data.tracks.items[0].album.artists[0].name)
		
	// 	// The song's name
	// 	console.log("The name of this song is " + data.tracks.items[0].name)
		
	// 	// A preview link of the song from Spotify
	// 	console.log("Here is a preview link of this song " + data.tracks.items[0].album.artists[0].external_urls.spotify)
		
	// 	// The album that the song is from
	// 	console.log("The album of this song is " + data.tracks.items[0].album.name)
	// });
}

function spotifySong(){
	//if there is no input for lirirequested item
	if (liriRequestedItem.length ===0 ) {
		liriRequestedItem = "The Sign";
	}

	spotify.search({ type: 'track', query: liriRequestedItem }, function(err, data) {
	    
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    
	    console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
	    // Artist(s)
	    console.log("The Artist of this song is " + data.tracks.items[0].album.artists[0].name)
		
		// The song's name
		console.log("The name of this song is " + data.tracks.items[0].name)
		
		// A preview link of the song from Spotify
		console.log("Here is a preview link of this song " + data.tracks.items[0].album.artists[0].external_urls.spotify)
		
		// The album that the song is from
		console.log("The album of this song is " + data.tracks.items[0].album.name)
	});

}

//----------------------------------------------------------//
//            Liri  Twitter-This controls                   //
//----------------------------------------------------------//

// if(liriCommand === "my-tweets"){
 
// 	// var params = {screen_name: 'nodejs'};
// 	// keys.get('statuses/user_timeline', params, function(error, tweets, response) {
// 	//   if (error) {
// 	//     console.log(error);
// 	//   }
// 	//   console.log(tweets);
// 	//   console.log(response);
// 	// });

// }

function myTweets(){

}
//----------------------------------------------------------//
//            Liri  Do-This controls                        //
//----------------------------------------------------------//
if(liriCommand === "do-what-it-says"){

	fs.readFile("random.txt", "utf8", function(err, contents) {
		if (err) {
	    	console.log(err);
	   	}
	    //console.log(contents);
	    var listItem = contents.split(",");
	    //console.log(listItem);
	    liriCommand = listItem[0];
	    liriRequestedItem = listItem[1];

	    if(liriCommand === "my-tweets"){myTweets();}
	   	else if(liriCommand === "spotify-this-song"){spotifySong();}
	   	else if (liriCommand === "movie-this"){ movieStats();}
	});
}


