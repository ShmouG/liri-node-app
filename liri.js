require("dotenv").config();

const fs = require('fs');
var Spotify = require('node-spotify-api');
const request = require('request');
const command = process.argv[2];
const query = process.argv[3];
const space = '\n';
const dataKeys = require("./keys");

let writeToLog = function (data) {
  fs.appendFile("random.text", '\r\n\r\n');

  fs.appendFile("random.text", JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
}
// spotify api function
function getMeSpotify(songName) {
  let spotify = new Spotify(dataKeys.spotify);

  if (!songName) {
    songName = "White and nerdy";
  }

  spotify.search({
    type: 'track',
    query: songName
  }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    } else {
      output = space + "================= LIRI FOUND THIS FOR YOU...==================" +
        space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
        space + "Album Name: " + data.tracks.items[0].album.name +
        space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
        space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
      console.log(output);

      fs.appendFile("log.txt", output, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    };
  });
}
// omdb movie api function
let getMeMovie = function (movieName) {
  if (!movieName) {
    movieName = "Tetsuo: The Iron man";
  }

  let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryURL, function (err, res, body) {
    if (err) throw err;
    else {
      let jsonData = JSON.parse(body);

      output = space + "================= LIRI FOUND THIS FOR YOU...==================" +
        space + 'Title: ' + jsonData.Title +
        space + 'Year: ' + jsonData.Year +
        space + 'Rated: ' + jsonData.Rated +
        space + 'IMDB Rating: ' + jsonData.imdbRating +
        space + 'Country: ' + jsonData.Country +
        space + 'Language: ' + jsonData.Language +
        space + 'Plot: ' + jsonData.Plot +
        space + 'Actors: ' + jsonData.Actors +
        space + 'Tomato Rating: ' + jsonData.Ratings[1].Value +
        space + 'IMDb Rating: ' + jsonData.imdbRating + "\n";

      console.log(output);

      fs.appendFile("log.txt", output, function (err) {
        if (err) throw err;
        console.log('Saved!');
        space
      });
    }
  });
}



const pick = function (caseData, functionData) {
  switch (caseData) {
    case 'spotify-this-song':
      getMeSpotify(functionData)
      break;
    case 'movie-this':
      getMeMovie(functionData)
      break;
  }
}
//run this on load of js file
let runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);