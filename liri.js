require("dotenv").config();

const fs = require('fs');
var Spotify = require('node-spotify-api');
const request = require('request');
const space = '\n';
const dataKeys = require("./keys");


let writeToLog = function (data) {
  fs.appendFile("log.txt", '\r\n\r\n');

  fs.appendFile("log.txt", JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
} 

function toLog() {
  fs.appendFile("log.txt",'concert-this', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

// bands in town api function 
function concertThis(artist) {
  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
  request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, function(error, response, body) {
      // If the request was successful...
      if (!error && response.statusCode === 200) {
          var JS = JSON.parse(body);
          for (i = 0; i < JS.length; i++) {
              var dTime = JS[i].datetime;
              var month = dTime.substring(5,7);
              var year = dTime.substring(0,4);
              var day = dTime.substring(8,10);
              var dateForm = month + "/" + day + "/" + year
              output = space + "༼ つ ◕o◕ ༽つ ༼ つ ◕o◕ ༽つ LIRI FOUND THIS FOR YOU...༼ つ ◕o◕ ༽つ ༼ つ ◕o◕ ༽つ" + "\n" +
              space + "Date: " + dateForm +
              space + "Name: " + JS[i].venue.name +
              space + "City: " + JS[i].venue.city +
              space + "Country: " + JS[i].venue.country;
              console.log(output);

              fs.appendFile("log.txt", output, function (err) {
                if (err) throw err;
                console.log('Saved!');
              }); 
          }
      }
      
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
      output = space + "༼ つ ◕o◕ ༽つ ༼ つ ◕o◕ ༽つ LIRI FOUND THIS FOR YOU...༼ つ ◕o◕ ༽つ ༼ つ ◕o◕ ༽つ" + "\n" +
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

      output = space + "༼ つ ◕o◕ ༽つ ༼ つ ◕o◕ ༽つ LIRI FOUND THIS FOR YOU...༼ つ ◕o◕ ༽つ ༼ つ ◕o◕ ༽つ" + "\n" +
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

let doWhatItSays = function() {
  fs.readFile("random.text", "utf8", function(error, data) {
      console.log(data);
      writeToLog(data);
      let dataArr = data.split(',')

      if (dataArr.length == 2) {
          pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length == 1) {
          pick(dataArr[0]);
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
    case 'concert-this':
      concertThis(functionData);
      toLog();
     break;
    case 'do-what-it-says':
    doWhatItSays(functionData);
    break;
  }
}
//run this on load of js file
let runThis = function (argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);