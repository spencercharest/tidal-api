<a name="Tidal"></a>

## Tidal
Class

**Kind**: global class  

* [Tidal](#Tidal)
    * [.login(username, password)](#Tidal+login) ⇒ <code>Promise</code>
    * [.search(query, type, [limit])](#Tidal+search) ⇒ <code>Promise</code>
    * [.getTrack(id)](#Tidal+getTrack) ⇒ <code>Promise</code>
    * [.getAlbum(id)](#Tidal+getAlbum) ⇒ <code>Promise</code>
    * [.getAlbumTracks(id)](#Tidal+getAlbumTracks) ⇒ <code>Promise</code>
    * [.getTopAlbums()](#Tidal+getTopAlbums) ⇒ <code>Promise</code>
    * [.getNewAlbums()](#Tidal+getNewAlbums) ⇒ <code>Promise</code>
    * [.getStaffPickAlbums()](#Tidal+getStaffPickAlbums) ⇒ <code>Promise</code>
    * [.getFavoriteAlbums()](#Tidal+getFavoriteAlbums) ⇒ <code>Promise</code>
    * [.getArtist(id)](#Tidal+getArtist) ⇒ <code>Promise</code>
    * [.getArtistAlbums(id)](#Tidal+getArtistAlbums) ⇒ <code>Promise</code>
    * [.getArtistEPsAndSingles(id)](#Tidal+getArtistEPsAndSingles) ⇒ <code>Promise</code>
    * [.getArtistCompilations(id)](#Tidal+getArtistCompilations) ⇒ <code>Promise</code>
    * [.getArtistTopTracks(id, [limit])](#Tidal+getArtistTopTracks) ⇒ <code>Promise</code>
    * [.getSimilarArtists(id)](#Tidal+getSimilarArtists) ⇒ <code>Promise</code>
    * [.getFavoriteArtists()](#Tidal+getFavoriteArtists) ⇒ <code>Promise</code>
    * [.getPlaylist(uuid)](#Tidal+getPlaylist) ⇒ <code>Promise</code>
    * [.getPlaylistTracks(uuid)](#Tidal+getPlaylistTracks) ⇒ <code>Promise</code>
    * [.artistPicToUrl(uuid)](#Tidal+artistPicToUrl) ⇒ <code>Object</code>
    * [.albumArtToUrl(uuid)](#Tidal+albumArtToUrl) ⇒ <code>Object</code>

<a name="Tidal+login"></a>

### tidal.login(username, password) ⇒ <code>Promise</code>
login to Tidal in order to use methods that require authentication

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Object</code> - user data object (see example for object properties)  
**Reject**: <code>Error</code>  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | Tidal username or email |
| password | <code>string</code> | Tidal password |

**Example**  
```js
tidal.login('username', 'password')
// returns a promise that resolves to
  {
    userId: 49927020,
    sessionId: '24d3d406-e6b9-457a-bf57-eac7b113a20c',
    countryCode: 'US'
  }
```
<a name="Tidal+search"></a>

### tidal.search(query, type, [limit]) ⇒ <code>Promise</code>
search for artists, albums, tracks, or playlists

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of objects (object properties are dependent on search type)  
**Reject**: <code>Error</code>  

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

### tidal.getTrack(id) ⇒ <code>Promise</code>
get a track by its id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Object</code> - a track object (see example for object properties)  
**Reject**: <code>Error</code>  

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

### tidal.getAlbum(id) ⇒ <code>Promise</code>
get an album by its id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Object</code> - an album object (see example for object properties)  
**Reject**: <code>Error</code>  

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
    "copyright": "2017 Weezer under exclusive license to Crush Music / \
    Atlantic Recording Corporation for the United States and Crush Music / \
    WEA International Inc. for the world excluding the United States. \
    A Warner Music Company.",
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

### tidal.getAlbumTracks(id) ⇒ <code>Promise</code>
get album tracks by album id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of track objects  
**Reject**: <code>Error</code>  
**See**: [getTrack](#Tidal+getTrack) - track object example  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | album id |

**Example**  
```js
tidal.getAlbumTracks(80216363)
```
<a name="Tidal+getTopAlbums"></a>

### tidal.getTopAlbums() ⇒ <code>Promise</code>
get top 20 albums on Tidal

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of album objects  
**Reject**: <code>Error</code>  
**See**: [getAlbum](#Tidal+getAlbum) - album object example  
**Example**  
```js
tidal.getTopAlbums()
```
<a name="Tidal+getNewAlbums"></a>

### tidal.getNewAlbums() ⇒ <code>Promise</code>
get new albums on Tidal

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of album objects  
**Reject**: <code>Error</code>  
**See**: [getAlbum](#Tidal+getAlbum) - album object example  
**Example**  
```js
tidal.getNewAlbums()
```
<a name="Tidal+getStaffPickAlbums"></a>

### tidal.getStaffPickAlbums() ⇒ <code>Promise</code>
get staff pick albums on Tidal

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of album objects  
**Reject**: <code>Error</code>  
**See**: [getAlbum](#Tidal+getAlbum) - album object example  
**Example**  
```js
tidal.getStaffPickAlbums()
```
<a name="Tidal+getFavoriteAlbums"></a>

### tidal.getFavoriteAlbums() ⇒ <code>Promise</code>
get your favorite (starred) albums (requires login() to be called)

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of album objects  
**Reject**: <code>Error</code>  
**See**

- [login](#Tidal+login) - login method must be called first
- [getAlbum](#Tidal+getAlbum) - album object example

**Example**  
```js
tidal.getFavoriteAlbums()
```
<a name="Tidal+getArtist"></a>

### tidal.getArtist(id) ⇒ <code>Promise</code>
get an artist by its id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Object</code> - an artist object (see example for object properties)  
**Reject**: <code>Error</code>  

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

### tidal.getArtistAlbums(id) ⇒ <code>Promise</code>
get artist albums by artist id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of album objects  
**Reject**: <code>Error</code>  
**See**: [getAlbum](#Tidal+getAlbum) - album object example  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**  
```js
tidal.getArtistAlbums(3575680)
```
<a name="Tidal+getArtistEPsAndSingles"></a>

### tidal.getArtistEPsAndSingles(id) ⇒ <code>Promise</code>
get artist EPs and singles by artist id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of album objects  
**Reject**: <code>Error</code>  
**See**: [getAlbum](#Tidal+getAlbum) - album object example  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**  
```js
tidal.getArtistEPsAndSingles(3575680)
```
<a name="Tidal+getArtistCompilations"></a>

### tidal.getArtistCompilations(id) ⇒ <code>Promise</code>
get compliations that artist has appeared on by artist id

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of album objects  
**Reject**: <code>Error</code>  
**See**: [getAlbum](#Tidal+getAlbum) - album object example  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**  
```js
tidal.getArtistCompilations(3575680)
```
<a name="Tidal+getArtistTopTracks"></a>

### tidal.getArtistTopTracks(id, [limit]) ⇒ <code>Promise</code>
get top tracks by artist

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of track objects  
**Reject**: <code>Error</code>  
**See**: [getTrack](#Tidal+getTrack) - track object example  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | artist id |
| [limit] | <code>number</code> | <code>10</code> | results limit |

**Example**  
```js
tidal.getArtistTopTracks(3575680)
```
<a name="Tidal+getSimilarArtists"></a>

### tidal.getSimilarArtists(id) ⇒ <code>Promise</code>
get similar artists

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Object</code> - artist object  
**Reject**: <code>Error</code>  
**See**: [getArtist](#Tidal+getArtist) - artist object example  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | artist id |

**Example**  
```js
tidal.getSimilarArtists(3575680)
```
<a name="Tidal+getFavoriteArtists"></a>

### tidal.getFavoriteArtists() ⇒ <code>Promise</code>
get your favorite (starred) artists (requires login() to be called)

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of artist objects  
**Reject**: <code>Error</code>  
**See**

- [login](#Tidal+login) - login method must be called first
- [getArtist](#Tidal+getArtist) - album object example

**Example**  
```js
tidal.getFavoriteArtists()
```
<a name="Tidal+getPlaylist"></a>

### tidal.getPlaylist(uuid) ⇒ <code>Promise</code>
get a playlist by its uuid

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Object</code> - playlist object (see example for object properties)  
**Reject**: <code>Error</code>  

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
    "description": "Get down and dirty with some of the finest soul, funk \
    and four-to-the floor disco out there. Bound to get the blood pumping, \
    this playlist boasts more hits than a boxing match, more hooks than a \
    tackle box and marks the perfect prescription both for champagne days \
    and boogie nights and alike. Whether you feel like being a sex machine \
    or simply wish to dance to the music, rock your body, dig it and don't \
    stop 'til you get enough! ",
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

### tidal.getPlaylistTracks(uuid) ⇒ <code>Promise</code>
get playlist tracks by playlist uuid

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  
**Fulfil**: <code>Array</code> - an array of track objects  
**Reject**: <code>Error</code>  
**See**: [getTrack](#Tidal+getTrack) - track object example  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | playlist uuid |

**Example**  
```js
tidal.getPlaylistTracks('1c5d01ed-4f05-40c4-bd28-0f73099e9648')
```
<a name="Tidal+artistPicToUrl"></a>

### tidal.artistPicToUrl(uuid) ⇒ <code>Object</code>
get valid urls to artist pictures

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | artist picture uuid (can be found as picture property in artist object) |

**Example**  
```js
tidal.artistPicToUrl('04d63cd8-a1a5-42e0-b1ec-8e336b7d9200')
// returns
  {
    sm: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/160x107.jpg',
    md: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/320x214.jpg',
    lg: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/640x428.jpg'
  }
```
<a name="Tidal+albumArtToUrl"></a>

### tidal.albumArtToUrl(uuid) ⇒ <code>Object</code>
get valid urls to album art

**Kind**: instance method of [<code>Tidal</code>](#Tidal)  

| Param | Type | Description |
| --- | --- | --- |
| uuid | <code>string</code> | album art uuid (can be found as cover property in album object) |

**Example**  
```js
tidal.albumArtToUrl('9a56f482-e9cf-46c3-bb21-82710e7854d4')
// returns
  {
    sm: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/160x160.jpg',
    md: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/320x320.jpg',
    lg: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/640x640.jpg',
    xl: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/1280x1280.jpg'
  }
```
