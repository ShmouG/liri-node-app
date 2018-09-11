require("dotenv").config();

const fs = require('fs');
const spotify = require('node-spotify-api');
const request = require('request');
const command = process.argv[2];
const query = process.argv[3];

const keys = require("./keys");
console.log(process.env.SPOTIFY_ID) 
console.log(process.env.SPOTIFY_SECRET)

debugger;

const spotify = new Spotify(keys.spotify);


const spotifyThisSong = function (trackQuery) {
    // const spotify = require("spotify");

    if (trackQuery === undefined) {
        trackQuery = "slappin da base man";
    }

    spotify.search({
            type: 'track',
            query: trackQuery
        },
        (error, data) => {
            if (error) throw error;
            else {
                for (i = 0; i < data.tracks.items[0].artists.length; i++) {
                    if (i === 0) {
                        console.log('Artist:   ' + data.tracks.items[0].artists[i].name);
                    } else {
                        console.log('   ' + data.tracks.items[0].artists[i].name);

                    }
                }
            }
            console.log("Song:         " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album:        " + data.tracks.items[0].album.name);
        }
    )

}
debugger;
