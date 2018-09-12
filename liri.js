require("dotenv").config();

const fs = require('fs');
var Spotify = require('node-spotify-api');
const request = require('request');
const command = process.argv[2];
const query = process.argv[3];
const space = '\n';
const dataKeys = require("./keys");

let writeToLog = function(data) {
  fs.appendFile("random.text", '\r\n\r\n');

  fs.appendFile("random.text", JSON.stringify(data), function(err) {
      if (err) {
          return console.log(err);
      }

      console.log("log.txt was updated!");
  });
}

function getMeSpotify(songName) {
  let spotify = new Spotify(dataKeys.spotify);

  if (!songName) {
      songName = "What's my age again";
  }

  spotify.search({ type: 'track', query: songName }, function(err, data) {
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

          fs.appendFile("log.txt", output, function(err) {
              if (err) throw err;
              console.log('Saved!');
          });
      };
  });
}

const pick = function (caseData, functionData) {
  switch (caseData){
    case 'spotify-this-song':
    getMeSpotify(functionData)
    break;
  }
}
//run this on load of js file
let runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

debugger;

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

// const spotifyThisSong = function (trackQuery) {
//     // const spotify = require("spotify");

//     if (trackQuery === undefined) {
//         trackQuery = "slappin da base man";
//     }

//     spotify.search({
//             type: 'track',
//             query: trackQuery
//         },
//         function (error, data) {
//             if (error) throw error;
//             else {
//                 for (i = 0; i < data.tracks.items[0].artists.length; i++) {
//                     if (i === 0) {
//                         console.log('Artist:   ' + data.tracks.items[0].artists[i].name);
//                     } else {
//                         console.log('   ' + data.tracks.items[0].artists[i].name);

//                     }
//                 }
//             }
//             console.log("Song:         " + data.tracks.items[0].name);
//             console.log("Preview Link: " + data.tracks.items[0].preview_url);
//             console.log("Album:        " + data.tracks.items[0].album.name);
//         }
//     )

// }
// debugger;
