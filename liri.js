//----------------------------------------------------------//
//            Requirements and Global Variables             //
//----------------------------------------------------------//

//requried NPMs
var spotify = require("spotify");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

//keys for twitter
var keys = require('./keys.js');
var twitterKeyList = keys.twitterKeys;
// console.log(twitterKeyList)

//interactions for liri
var liriCommand = process.argv[2];
var liriString = process.argv;
var liriRequestedItem = "";

// movie variables
var queryURL;



//----------------------------------------------------------//
//                  String Arguments Together               //
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
//liri run command
if(liriCommand === "movie-this"){
	movieStats();
}

function movieStats(){
	//if there is no input for lirirequested item
	if (liriRequestedItem.length ===0 ) {
		liriRequestedItem = "Mr.Nobody";
	}
	
	//url build for request
	queryURL = "http://www.omdbapi.com/?t="+ liriRequestedItem +"&y=&plot=short&tomatoes=true&r=json"
	// console.log(queryURL)
	// console.log(liriRequestedItem)
	// runs a request to the OMDB API
	request(queryURL, function(err, response, body) {
		if (err) {
			console.log(err);
		}

	  // If the request is successful
	  if (!err && response.statusCode === 200) {
			console.log(JSON.parse(body));
			// console.log(response);
		    // Title of the movie.
		    var title = JSON.parse(body).Title;
		    console.log("The movie's title is: " + title);
			
			// Year the movie came out.
			var year = JSON.parse(body).Year;
			console.log("The movie's release year is: " + year);
			
			// IMDB Rating of the movie.
			var rating = JSON.parse(body).Rated;
			console.log("The movie's rating is: " + rating);
			
			// Country where the movie was produced.
			var country = JSON.parse(body).Country;
			console.log("The movie's country of production is: " + country);
			
			// Language of the movie.
			var language = JSON.parse(body).Language;
			console.log("The movie's language is: " + language);
			
			// Plot of the movie.
			var plot = JSON.parse(body).Plot;
			console.log("The movie's plot is: " + plot);
			
			// Actors in the movie.
			var actors = JSON.parse(body).Actors;
			console.log("The movie's actors are: " + actors);
			
			// Rotten Tomatoes Rating.
			var RTR = JSON.parse(body).tomatoUserRating;
			console.log("The movie's rotten tomatoes rating is: " + JSON.parse(body).tomatoUserRating);
			
			// Rotten Tomatoes URL.
			var RTURL = JSON.parse(body).tomatoURL;
			console.log("The movie's rotten tomatores URL is: " + JSON.parse(body).tomatoURL);
		
			var logInput = "\n"+title + "\n" + year + " \n" + rating + " \n " + country+ " \n " + language + " \n" + plot+ " \n" + actors+ " \n " + RTURL+ " \n " + RTR
			logsControl(liriCommand, logInput)

		}
	});

}

//----------------------------------------------------------//
//            Liri  Spotify-This controls                   //
//----------------------------------------------------------//
//liri run command
if(liriCommand === "spotify-this-song"){
	spotifySong();
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
	    
	    // Artist(s)
	    var artist = data.tracks.items[0].album.artists[0].name;
	    console.log("The Artist of this song is " + artist)
		
		// The song's name
		var song = data.tracks.items[0].name;
		console.log("The name of this song is " + song)
		
		// A preview link of the song from Spotify
		var preview = data.tracks.items[0].album.artists[0].external_urls.spotify;
		console.log("Here is a preview link of this song " + preview)
		
		// The album that the song is from
		var album = data.tracks.items[0].album.name
		console.log("The album of this song is " + album)

		//logger.log
		var logInput = artist + " \n " + song + " \n" + preview + " \n " + album
		logsControl(liriCommand, logInput)

	});

}

//----------------------------------------------------------//
//            Liri  Twitter-This controls                   //
//----------------------------------------------------------//
//liri run command
if(liriCommand === "my-tweets"){
	myTweets();
	
}



function myTweets(){

	var logInput = [];
	var userName = process.argv[3]

	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {screen_name: userName};
	client.get("statuses/user_timeline", params, function(err, tweets, response) {
	  if (err) {
	  	console.log(err);
	  }
	  for(var i = 0; i < tweets.length; i++){
	  	console.log(tweets[i].text);
	  	logInput.push(tweets[i].text);
		}
		logsControl(liriCommand, logInput);
	});

}

if(liriCommand === "post-tweet"){
	updateStatus();
}

function updateStatus(){
	var logInput = [];
	var userTweet = liriRequestedItem;

	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});

	client.post('statuses/update', {status: userTweet}, function(err, tweet, response) {
	 if (err) {
	    console.log(err);
	  }

	  else {
	    logsControl(liriCommand, userTweet);
	  }
	});

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

//----------------------------------------------------------//
//               Liri  Logs controls                        //
//----------------------------------------------------------//

function logsControl(command, input){
	var phrase = "\n--------------" + "\n" + command + " " + ":" + " " + input +"\n----------------"
	fs.appendFile("logs.txt", phrase , function(err) {
	 //if an error occurs
	  if (err) {
	    console.log(err);
	  }

	  else {
	    console.log("Content Added!");
	  }
	});

}

