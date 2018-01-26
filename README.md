[![Build Status](https://travis-ci.org/spencercharest/tidal-api.svg?branch=master)](https://travis-ci.org/spencercharest/tidal-api)
[![Coverage Status](https://coveralls.io/repos/github/spencercharest/tidal-api/badge.svg?branch=master)](https://coveralls.io/github/spencercharest/tidal-api?branch=master)

# tidal-api-wrapper

An unofficial API wrapper for Tidal Music. Tidal does not provide a documented public API so all endpoints have been found using Chrome Dev Network Tools. All methods return promises and are "thenable" (with the exception of artistPicToUrl and albumArtToUrl).

# Note

Since this is an unofficial wrapper and the Tidal API is not public this wrapper could break at any time. Automated tests are performed daily on Travis and if any endpoints have changed or are not working the build will be marked as failing.

## Usage

Import tidal-api-wrapper and instantiate it.

```js
var Tidal = require('tidal-api-wrapper');

var tidal = new Tidal();
```

<a name="Tidal"></a>

## Documentation

[API Reference](https://github.com/spencercharest/tidal-api/tree/master/docs/api.md)

## Examples

#### Using ES2015

```js
import Tidal from 'tidal-api-wrapper';
const tidal = new Tidal();

// search for an artist and then get their albums
tidal.search('Four Year Strong', 'artists', 1)
  .then(artists => tidal.getArtistAlbums(artists[0].id))
  .then((albums) => {
    console.log(albums);
    return albums;
  })
  .catch((err) => {
    console.log(err);
  });

  // get all artist albums and then tracks for each album
  tidal.getArtistAlbums(3575680)
    .then((albums) => {
      const promises = albums.map(album =>
        tidal.getAlbumTracks(album.id));

      return Promise.all(promises)
        .then((tracks) => {
          console.log(tracks);
          return tracks;
        });
    });

  // login and get favorite artists
  tidal.login('email@example.com', 'password')
    .then(auth => tidal.getFavoriteArtists())
    .then((myFavoriteArtists) => {
      console.log(myFavoriteArtists);
      return myFavoriteArtists;
    })
    .catch((err) => {
      console.log(err);
    });

```

#### Using ES7 async/await

```js
import Tidal from 'tidal-api-wrapper';
const tidal = new Tidal();

// search for an artist and then get their albums
(async function searchArtistAndGetAlbums() {
  try {
    const artists = await tidal.search('Four Year Strong', 'artists', 1);
    const artist = artists[0];
    const albums = await tidal.getArtistAlbums(artist.id);
    console.log(albums);
    return albums;
  } catch (e) {
    console.log(e);
  }
})();

// get all artist albums and then tracks for each album
(async function getAllArtistTracks() {
  try {
    const albums = await tidal.getArtistAlbums(3575680);
    const promises = albums.map(album => tidal.getAlbumTracks(album.id));
    const tracks = await Promise.all(promises);
    console.log(tracks);
    return tracks;
  } catch (e) {
    console.log(e);
  }
})();

// login and get favorite artists
(async function getMyFavoriteArtist() {
  try {
    const auth = await tidal.login('email@example.com', 'password');
    const myFavoriteArtists = tidal.getFavoriteArtists();
    console.log(myFavoriteArtists);
  } catch (e) {
    console.log(e);
  }
})();
```
