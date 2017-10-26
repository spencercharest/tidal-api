# tidal-api

An unofficial API wrapper for Tidal Music.

## Usage

Import tidal-api and instantiate it.

```js
var Tidal = require('tidal-api');

var tidal = new Tidal();
```

## Methods

#### `tidal.search(query, type, limit(optional))`
Type must be one of 'artists', 'albums', 'tracks', 'playlists'.
```js
/*
* @param {string} query - search query
* @param {string} type - search type (artists, albums, tracks, playlists)
* @param {number} limit(optional) - search limit (defaults to 25)
**/

//search for an artist
tidal.search('Four Year Strong', 'artists')
  .then(artists => artists)
  .catch(e => e);

// or search for a song
tidal.search('adele', 'tracks')
  .then(tracks => tracks)
  .catch(e => e);
```
