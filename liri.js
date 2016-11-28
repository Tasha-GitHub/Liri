//----------------------------------------------------------//
//            Requirements and Global Variables             //
//----------------------------------------------------------//

var spotify = require("spotify");
var twitter = require("twitter");
var omdb = require("omdb")
var fs = require("fs");
var keys = require('./keys.js');
var command = process.argv;


//----------------------------------------------------------//
//            Liri  Movie-This controls                     //
//----------------------------------------------------------//
console.log(command)