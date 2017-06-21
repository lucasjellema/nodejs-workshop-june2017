/*
example call:  http://127.0.0.1:5100/artists/get?artist=u2

*/

var http = require('http'),
  request = require('request'),
  express = require('express'),
  bodyParser = require('body-parser')
async = require('async'),
  artistEnricherApiLib = require('./artist-enricher-api-lib.js')
  ;

var PORT = 5100;
var spotifyAPI = artistEnricherApiLib.spotifyAPI;
var token = artistEnricherApiLib.token;

var route_options = {
  "method": "GET"
  , "headers": {
    "Authorization": "Bearer " + token
  }
};

var app = express()
  .use(bodyParser.urlencoded({ extended: true }))
  // register url path /artists/:artistname
  .get('/artists/:artistname', function (req, res) {
    var artistName = req.params['artistname'];
    handleArtists(req, res, artistName);
  })
  // register url path 
  .get('/artists', function (req, res) {
    var artistName = req.query['artist'];	// to retrieve value of query parameter called artist (?artist=someValue&otherParam=X)
    handleArtists(req, res, artistName);
  })
  .get('/', function (req, res) {
    console.log('request received: ' + request.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("Artist Enricher API - No Data Requested, so none is returned");
    res.write("Try something like http://127.0.0.1:5100/artists/get?artist=madonna");
    res.end();
  })
  .listen(PORT);

console.log('server running on port ', PORT);


function composeArtisResponse(res, artist) {
  res.statusCode = 200;
  res.send(JSON.stringify(artist));
}//composeArtisResponse

function composeErrorResponse(res, err) {
  logger.log("Error in composing artist response: " + JSON.stringify(err), moduleName, logger.ERROR);
  res.statusCode = 500;
  res.send('An internal error occurred: ' + JSON.stringify(err));
}//composeErrorResponse


function handleArtists(req, res, artistName) {
  var artist = {}; // artist record that will be constructed bit by bit

  // use async.waterfall to organize two sequential actions that each perform an asynchronous operation (HTTP REQEUST)
  async.waterfall([
    // first function: find artist on spotify, establish the id and some basic attributes
    function (callback) {
      var artistUrl = spotifyAPI + '/search?q=' + encodeURI(artistName) + '&type=artist'; // use encodeURI to handle special characters in the name in the proper way
      route_options.uri = artistUrl;
      console.log('1. Call to Spotify to find artist : ' + artistUrl);
      // 1. invoke Spotify Search API to find the Artist and the spotify identifier; the response brings in genres and an image url 
      request(route_options, function handleSpotifySearchResponse(error, response, body) {
        if (error) {
          console.log("error in processing " + JSON.stringify(error));
          logger.log("Error in processing artist enrichment: " + JSON.stringify(err), moduleName, logger.ERROR);
          callback(error, artist.spotifyId);
        }
        if (!error && response.statusCode == 200) {
          var artistsResponse = JSON.parse(body);

          // if the artist has not been found, return immediately	  
          if (artistsResponse.artists.total == 0) {
            callback(null, 'not found');
          }// if artist not found

          // else continue processing with spotify response
          artist.spotifyId = artistsResponse.artists.items[0].id;
          artist.name = artistsResponse.artists.items[0].name;
          artist.genres = JSON.stringify(artistsResponse.artists.items[0].genres);
          if (artistsResponse.artists.items[0].images.length > 0) {
            artist.imageURL = artistsResponse.artists.items[0].images[0].url;
          }
          artist.spottiyHRef = artistsResponse.artists.items[0].href;
          callback(null, artist.spotifyId);
        }//!error in spotify search
      });// request
    }, // second function: go collect list of albums by this artist
    function (artistSpotifyId, callback) {

      // 2. now get discography - the most recent 50 albums (the maximum we can collect in one call)
      var albumsURL = spotifyAPI + '/artists/' + artistSpotifyId + '/albums' + '?limit=50&album_type=album';
      console.log('2. Call to Spotify to collect list of albums : ' + albumsURL);
      artist.albums = [];
      route_options.uri = albumsURL;
      request(route_options, function (error, response, body) {
        var albumsResponse = JSON.parse(body);
        for (var i = 0; i < albumsResponse.items.length; i++) {
          var album = {};
          album.title = albumsResponse.items[i].name;
          if (albumsResponse.items[i].images.length > 0) {
            album.imageURL = albumsResponse.items[i].images[0].url;
          }
          album.spotifyId = albumsResponse.items[i].id;
          artist.albums.push(album);
        };// for loop over albums
        callback(null, artist.albums);
      });//request     
    } // go get details on the albums in the list artist.albums
  ]
    // all functions in the waterfall are complete, now we can proceed
    , function (err, results) {
      console.log("Done waterfall!");
      if (err) {
        logger.log("Error in processing artist enrichment: " + JSON.stringify(err), moduleName, logger.ERROR);
        console.log("error in processing " + JSON.stringify(err));
        composeErrorResponse(res, err);
      }
      else {
        console.log("done with processing " + JSON.stringify(results));
        // take the artist record as it stands right now and compose the response
        composeArtisResponse(res, artist);
      }
    });//waterfall
} //handleArtists


