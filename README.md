[![Build Status](https://travis-ci.org/spencercharest/tidal-api.svg?branch=master)](https://travis-ci.org/spencercharest/tidal-api)
[![Coverage Status](https://coveralls.io/repos/github/spencercharest/tidal-api/badge.svg?branch=master)](https://coveralls.io/github/spencercharest/tidal-api?branch=master)

# tidal-api

An unofficial API wrapper for Tidal Music. Tidal does not provide a documented public API so all endpoints have been found using Chrome Dev Network Tools. All methods return promises and are "thenable".

## Usage

Import tidal-api and instantiate it.

```js
var Tidal = require('tidal-api');

var tidal = new Tidal();
```

<a name="Tidal"></a>

## Tidal
Class

**Kind**: global class

* [Tidal](#Tidal)
    * [.search(query, type, [limit])](#Tidal+search) ⇒ <code>Promise.&lt;{Array.&lt;Object&gt;}&gt;</code>
    * [.getTrack(id)](#Tidal+getTrack) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getAlbum(id)](#Tidal+getAlbum) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getAlbumTracks(id)](#Tidal+getAlbumTracks) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getArtist(id)](#Tidal+getArtist) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getArtistAlbums(id)](#Tidal+getArtistAlbums) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getArtistEPsAndSingles(id)](#Tidal+getArtistEPsAndSingles) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getArtistCompilations(id)](#Tidal+getArtistCompilations) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.getPlaylist(uuid)](#Tidal+getPlaylist) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getPlaylistTracks(uuid)](#Tidal+getPlaylistTracks) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>

<a name="Tidal+search"></a>

### tidal.search(query, type, [limit]) ⇒ <code>Promise.&lt;{Array.&lt;Object&gt;}&gt;</code>
search for artists, albums, tracks, or playlists

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;{Array.&lt;Object&gt;}&gt;</code> - promise that resolves to an array of objects (object properties are dependent on search type)

**Throws**:

- <code>Error</code>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| query | <code>string</code> |  | search query |
| type | <code>string</code> |  | search type ('artists', 'albums', 'tracks', 'playlists') |
| [limit] | <code>number</code> | <code>25</code> | search limit |

**Example**
```js
tidal.search('Four Year Strong', 'artists', 1)
// returns a promise that resolves to:
  [
        {
            "id": 3575680,
            "name": "Four Year Strong",
            "url": "http://www.tidal.com/artist/3575680",
            "picture": "04d63cd8-a1a5-42e0-b1ec-8e336b7d9200",
            "popularity": 28
        }
    ]
```
<a name="Tidal+getTrack"></a>

### tidal.getTrack(id) ⇒ <code>Promise.&lt;Object&gt;</code>
get a track by its id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Object&gt;</code> - a promise that resolves to a track object

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | track id |

**Example**
```js
tidal.getTrack(64975224)
// returns a promise that resolves to:
  {
    "id": 64975224,
    "title": "22 (OVER S∞∞N)",
    "duration": 168,
    "replayGain": -10.71,
    "peak": 0.692531,
    "allowStreaming": true,
    "streamReady": true,
    "streamStartDate": "2016-09-30T00:00:00.000+0000",
    "premiumStreamingOnly": false,
    "trackNumber": 1,
    "volumeNumber": 1,
    "version": null,
    "popularity": 47,
    "copyright": "2016 Jagjaguwar",
    "url": "http://www.tidal.com/track/64975224",
    "isrc": "US38Y1630001",
    "editable": true,
    "explicit": false,
    "audioQuality": "LOSSLESS",
    "artist": {
        "id": 3566315,
        "name": "Bon Iver",
        "type": "MAIN"
    },
    "artists": [
        {
            "id": 3566315,
            "name": "Bon Iver",
            "type": "MAIN"
        }
    ],
    "album": {
        "id": 64975223,
        "title": "22, A Million",
        "cover": "5ac41fbb-927b-427e-8224-87bf12d218a3"
    }
  }
```
<a name="Tidal+getAlbum"></a>

### tidal.getAlbum(id) ⇒ <code>Promise.&lt;Object&gt;</code>
get an album by its id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Object&gt;</code> - a promise that resolves to an album object

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | album id |

**Example**
```js
tidal.getAlbum(80216363)
// returns a promise that resolves to:
  {
    "id": 80216363,
    "title": "Pacific Daydream",
    "duration": 2069,
    "streamReady": true,
    "streamStartDate": "2017-10-27T00:00:00.000+0000",
    "allowStreaming": true,
    "premiumStreamingOnly": false,
    "numberOfTracks": 10,
    "numberOfVideos": 0,
    "numberOfVolumes": 1,
    "releaseDate": "2017-10-27",
    "copyright": "2017 Weezer under exclusive license to Crush Music / Atlantic Recording Corporation for the United States and Crush Music / WEA International Inc. for the world excluding the United States. A Warner Music Company.",
    "type": "ALBUM",
    "version": null,
    "url": "http://www.tidal.com/album/80216363",
    "cover": "86538ca7-08fd-40ff-9a75-af88d74d1f48",
    "videoCover": null,
    "explicit": false,
    "upc": "075679889355",
    "popularity": 58,
    "audioQuality": "LOSSLESS",
    "artist": {
        "id": 30157,
        "name": "Weezer",
        "type": "MAIN"
    },
    "artists": [
        {
            "id": 30157,
            "name": "Weezer",
            "type": "MAIN"
        }
    ]
  }
```
<a name="Tidal+getAlbumTracks"></a>

### tidal.getAlbumTracks(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
get album tracks by album id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - a promise that resolves to an array of track objects (see [tidal.getTrack](#Tidal+getTrack) to see track object example)

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | album id |

**Example**
```js
tidal.getAlbumTracks(80216363)
```
<a name="Tidal+getArtist"></a>

### tidal.getArtist(id) ⇒ <code>Promise.&lt;Object&gt;</code>
get an artist by its id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Object&gt;</code> - a promise that resolves to an artist object

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**
```js
tidal.getArtist(3575680)
// returns a promise that resolves to:
  {
    "id": 3575680,
    "name": "Four Year Strong",
    "url": "http://www.tidal.com/artist/3575680",
    "picture": "04d63cd8-a1a5-42e0-b1ec-8e336b7d9200",
    "popularity": 28
  }
```
<a name="Tidal+getArtistAlbums"></a>

### tidal.getArtistAlbums(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
get artist albums by artist id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - a promise that resolves to an array of \
  album objects (see [tidal.getAlbum](#Tidal+getAlbum) to see album object example)

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**
```js
tidal.getArtistAlbums(3575680)
```
<a name="Tidal+getArtistEPsAndSingles"></a>

### tidal.getArtistEPsAndSingles(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
get artist EPs and singles by artist id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - a promise that resolves to an array of album objects (see [tidal.getAlbum](#Tidal+getAlbum) to see album object example)

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**
```js
tidal.getArtistEPsAndSingles(3575680)
```
<a name="Tidal+getArtistCompilations"></a>

### tidal.getArtistCompilations(id) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
get compliations that artist has appeared on by artist id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - a promise that resolves to an array of album objects (see [tidal.getAlbum](#Tidal+getAlbum) to see album object example)

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**
```js
tidal.getArtistCompilations(3575680)
```
<a name="Tidal+getPlaylist"></a>

### tidal.getPlaylist(uuid) ⇒ <code>Promise.&lt;Object&gt;</code>
get a playlist by its uuid

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Object&gt;</code> - a promise that resolves to a playlist object

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | playlist uuid |

**Example**
```js
tidal.getPlaylist('1c5d01ed-4f05-40c4-bd28-0f73099e9648')
// returns a promise that resolves to:
  {
    "uuid": "1c5d01ed-4f05-40c4-bd28-0f73099e9648",
    "title": "Get Down On It: Soul, Funk and Disco Supremo",
    "numberOfTracks": 100,
    "numberOfVideos": 0,
    "creator": {
        "id": 0
    },
    "description": "Get down and dirty with some of the finest soul, funk and four-to-the floor disco out there. Bound to get the blood pumping, this playlist boasts more hits than a boxing match, more hooks than a tackle box and marks the perfect prescription both for champagne days and boogie nights and alike. Whether you feel like being a sex machine or simply wish to dance to the music, rock your body, dig it and don't stop 'til you get enough! ",
    "duration": 25732,
    "lastUpdated": "2017-01-18T16:31:51.839+0000",
    "created": "2016-09-22T16:42:40.911+0000",
    "type": "EDITORIAL",
    "publicPlaylist": true,
    "url": "http://www.tidal.com/playlist/1c5d01ed-4f05-40c4-bd28-0f73099e9648",
    "image": "7a707631-02cf-47d8-a34c-e1395165f169",
    "popularity": 0
  }

```
<a name="Tidal+getPlaylistTracks"></a>

### tidal.getPlaylistTracks(uuid) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
get a playlist by its uuid

**Kind**: instance method of [<code>Tidal</code>](#Tidal)

**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - a promise that resolves to an array of track objects (see [tidal.getTrack](#Tidal+getTrack) to see track object example)

**Throws**:

- <code>Error</code>


| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | playlist uuid |

**Example**
```js
tidal.getPlaylistTracks('1c5d01ed-4f05-40c4-bd28-0f73099e9648')
```

## More Advanced Examples

#### Using ES2015

```js
import Tidal from 'tidal-api';
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

```

#### Using ES7 async/await

```js
// search for an artist and then get their albums
(async function() {
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
(async function() {
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
```

## Future Plans

In the next major release I plan to implement authenticated methods such as login, getFavoriteArtists, getFavoriteAlbums, addToFavoriteArtists, etc. Stay tuned!
