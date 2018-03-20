import axios from 'axios';
import qs from 'querystring';

/** Class */
class Tidal {

  /**
   *
   * @param {object} [options] - Tidal options (optional)
   * @param {string} [options.countryCode=US] - Tidal country code
   * @param {number} [options.limit=1000] - API results limit
   */
  constructor(options = {}) {
    this.url = 'https://api.tidal.com/v1';
    this.webToken = 'wdgaB1CilGA-S_s2';
    this.countryCode = options.countryCode || 'US';
    this.limit = options.limit || 1000;
    this.api = axios.create({
      baseURL: this.url,
      headers: {
        'x-tidal-token': this.webToken,
      },
    });
    // some base params for GET requests
    this.params = `limit=${this.limit}&countryCode=${this.countryCode}`;
    // params for Tidal pages that require a locale and device type
    this.localeParams = `locale=en_${this.countryCode}&deviceType=BROWSER&countryCode=${this.countryCode}`;
  }

  /**
  * login to Tidal in order to use methods that require authentication
  * @param {string} username - Tidal username or email
  * @param {string} password - Tidal password
  * @example tidal.login('username', 'password')
  * // returns a promise that resolves to
  {
    userId: 49927020,
    sessionId: '24d3d406-e6b9-457a-bf57-eac7b113a20c',
    countryCode: 'US'
  }
  * @returns {Promise}
  * @fulfil {Object} - user data object (see example for object properties)
  * @reject {Error}
  */
  async login(username, password) {

    if (!username || !password) {
      throw new Error('Username and password are required arguments of login()');
    }

    try {
      const params = qs.stringify({
        username,
        password,
      });

      const res = await this.api({
        method: 'POST',
        url: `/login/username?token=${this.webToken}`,
        data: params,
      });

      // store this info for use in other methods
      this.userId = res.data.userId;
      this.sessionId = res.data.sessionId;
      this.params = `${this.params}&sessionId=${res.data.sessionId}`;

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  /**
  * search for artists, albums, tracks, or playlists
  * @param {string} query - search query
  * @param {string} type - search type ('artists', 'albums', 'tracks', 'playlists')
  * @param {number} [limit] - search limit
  * @example
  * tidal.search('Four Year Strong', 'artists', 1)
  * // returns a promise that resolves to:
  [
        {
            "id": 3575680,
            "name": "Four Year Strong",
            "url": "http://www.tidal.com/artist/3575680",
            "picture": "04d63cd8-a1a5-42e0-b1ec-8e336b7d9200",
            "popularity": 28
        }
    ]
  * @returns {Promise}
  * @fulfil {Array} - an array of objects (object properties are dependent on search type)
  * @reject {Error}
  */
  async search(query, type, limit = 25) {

    const accTypes = ['artists', 'albums', 'tracks', 'playlists'];

    if (!type) {
      throw new Error('Search requires type as a second argument (artists, albums, tracks, or playlists)');
    }

    if (accTypes.indexOf(type) < 0) {
      throw new Error(`${type} is not a valid search type('artists', 'albums', 'tracks', 'playlists' are valid).`);
    }

    try {
      const res = await this.api({
        method: 'GET',
        url: `/search/${type}?query=${query}&limit=${limit}&countryCode=${this.countryCode}`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get a track by its id
  * @param {number} id - track id
  * @example
  * tidal.getTrack(64975224)
  * // returns a promise that resolves to:
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
  * @returns {Promise}
  * @fulfil {Object} - a track object (see example for object properties)
  * @reject {Error}
  */
  async getTrack(id) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/tracks/${id}?${this.params}`,
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get your favorite (starred) tracks (requires login() to be called)
  * @example tidal.getFavoriteTracks()
  * @returns {Promise}
  * @fulfil {Array} - an array of track objects
  * @reject {Error}
  * @see {@link Tidal#login} - login method must be called first
  * @see {@link Tidal#getTrack} - track object example
  */
  async getFavoriteTracks() {

    if (!this.userId || !this.sessionId) {
      throw new Error('You must call the login method first');
    }

    try {

      const res = await this.api({
        method: 'GET',
        url: `/users/${this.userId}/favorites/tracks?${this.params}`,
      });

      const { items } = res.data;

      const tracks = items.map(item => item.item);

      return tracks;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get an album by its id
  * @param {number} id - album id
  * @example tidal.getAlbum(80216363)
  * // returns a promise that resolves to:
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
  * @returns {Promise}
  * @fulfil {Object} - an album object (see example for object properties)
  * @reject {Error}
  */
  async getAlbum(id) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/albums/${id}?${this.params}`,
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get album tracks by album id
  * @param {number} id - album id
  * @example tidal.getAlbumTracks(80216363)
  * @returns {Promise}
  * @fulfil {Array} - an array of track objects
  * @reject {Error}
  * @see {@link Tidal#getTrack} - track object example
  */
  async getAlbumTracks(id) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/albums/${id}/tracks?${this.params}`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  // this is an internal method and so won't be included in JSDOC
  async getFeaturedAlbums() {

    try {

      const res = await this.api({
        method: 'GET',
        url: `/pages/show_more_featured_albums?${this.localeParams}`,
      });

      const { tabs } = res.data.rows[0].modules[0];

      const topAlbums = tabs.find(tab => tab.key === 'featured-top');
      const newAlbums = tabs.find(tab => tab.key === 'featured-new');
      const staffPicks = tabs.find(tab => tab.key === 'featured-recommended');

      return {
        topAlbums: topAlbums.pagedList.items,
        newAlbums: newAlbums.pagedList.items,
        staffPicks: staffPicks.pagedList.items,
      };

    } catch (e) {
      throw e;
    }
  }

  /**
  * get top 20 albums on Tidal
  * @example tidal.getTopAlbums()
  * @returns {Promise}
  * @fulfil {Array} - an array of album objects
  * @reject {Error}
  * @see {@link Tidal#getAlbum} - album object example
  */
  async getTopAlbums() {

    try {

      const featuredAlbums = await this.getFeaturedAlbums();

      return featuredAlbums.topAlbums;

    } catch (e) {
      throw e;
    }
  }

  /**
  * get new albums on Tidal
  * @example tidal.getNewAlbums()
  * @returns {Promise}
  * @fulfil {Array} - an array of album objects
  * @reject {Error}
  * @see {@link Tidal#getAlbum} - album object example
  */
  async getNewAlbums() {

    try {

      const featuredAlbums = await this.getFeaturedAlbums();

      return featuredAlbums.newAlbums;

    } catch (e) {
      throw e;
    }
  }

  /**
  * get staff pick albums on Tidal
  * @example tidal.getStaffPickAlbums()
  * @returns {Promise}
  * @fulfil {Array} - an array of album objects
  * @reject {Error}
  * @see {@link Tidal#getAlbum} - album object example
  */
  async getStaffPickAlbums() {

    try {

      const featuredAlbums = await this.getFeaturedAlbums();

      return featuredAlbums.staffPicks;

    } catch (e) {
      throw e;
    }
  }

  /**
  * get your favorite (starred) albums (requires login() to be called)
  * @example tidal.getFavoriteAlbums()
  * @returns {Promise}
  * @fulfil {Array} - an array of album objects
  * @reject {Error}
  * @see {@link Tidal#login} - login method must be called first
  * @see {@link Tidal#getAlbum} - album object example
  */
  async getFavoriteAlbums() {

    if (!this.userId || !this.sessionId) {
      throw new Error('You must call the login method first');
    }

    try {

      const res = await this.api({
        method: 'GET',
        url: `/users/${this.userId}/favorites/albums?${this.params}`,
      });

      const { items } = res.data;

      const albums = items.map(item => item.item);

      return albums;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get an artist by its id
  * @param {number} id - artist id
  * @example tidal.getArtist(3575680)
  * // returns a promise that resolves to:
  {
    "id": 3575680,
    "name": "Four Year Strong",
    "url": "http://www.tidal.com/artist/3575680",
    "picture": "04d63cd8-a1a5-42e0-b1ec-8e336b7d9200",
    "popularity": 28
  }
  * @returns {Promise}
  * @fulfil {Object} - an artist object (see example for object properties)
  * @reject {Error}
  */
  async getArtist(id) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/artists/${id}?${this.params}`,
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get artist albums by artist id
  * @param {number} id - artist id
  * @example tidal.getArtistAlbums(3575680)
  * @returns {Promise}
  * @fulfil {Array} - an array of album objects
  * @reject {Error}
  * @see {@link Tidal#getAlbum} - album object example
  */
  async getArtistAlbums(id) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/artists/${id}/albums?${this.params}`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get artist EPs and singles by artist id
  * @param {number} id - artist id
  * @example tidal.getArtistEPsAndSingles(3575680)
  * @returns {Promise}
  * @fulfil {Array} - an array of album objects
  * @reject {Error}
  * @see {@link Tidal#getAlbum} - album object example
  */
  async getArtistEPsAndSingles(id) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/artists/${id}/albums?${this.params}&filter=EPSANDSINGLES`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get compliations that artist has appeared on by artist id
  * @param {number} id - artist id
  * @example tidal.getArtistCompilations(3575680)
  * @returns {Promise}
  * @fulfil {Array} - an array of album objects
  * @reject {Error}
  * @see {@link Tidal#getAlbum} - album object example
  */
  async getArtistCompilations(id) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/artists/${id}/albums?${this.params}&filter=COMPILATIONS`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get top tracks by artist
  * @param {number} id - artist id
  * @param {number} [limit] - results limit
  * @example tidal.getArtistTopTracks(3575680)
  * @returns {Promise}
  * @fulfil {Array} - an array of track objects
  * @reject {Error}
  * @see {@link Tidal#getTrack} - track object example
  */
  async getArtistTopTracks(id, limit = 10) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/artists/${id}/toptracks?limit=${limit}&countryCode=${this.countryCode}`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get similar artists
  * @param {number} id - artist id
  * @example tidal.getSimilarArtists(3575680)
  * @returns {Promise}
  * @fulfil {Object} - artist object
  * @reject {Error}
  * @see {@link Tidal#getArtist} - artist object example
  */
  async getSimilarArtists(id) {
    try {

      const res = await this.api({
        method: 'GET',
        url: `/artists/${id}/similar?${this.params}`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get your favorite (starred) artists (requires login() to be called)
  * @example tidal.getFavoriteArtists()
  * @returns {Promise}
  * @fulfil {Array} - an array of artist objects
  * @reject {Error}
  * @see {@link Tidal#login} - login method must be called first
  * @see {@link Tidal#getArtist} - artist object example
  */
  async getFavoriteArtists() {

    if (!this.userId || !this.sessionId) {
      throw new Error('You must call the login method first');
    }

    try {

      const res = await this.api({
        method: 'GET',
        url: `/users/${this.userId}/favorites/artists?${this.params}`,
      });

      const { items } = res.data;

      const artists = items.map(item => item.item);

      return artists;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get a playlist by its uuid
  * @param {string} uuid - playlist uuid
  * @example tidal.getPlaylist('1c5d01ed-4f05-40c4-bd28-0f73099e9648')
  * // returns a promise that resolves to:
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
  * @returns {Promise}
  * @fulfil {Object} - playlist object (see example for object properties)
  * @reject {Error}
  */
  async getPlaylist(uuid) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/playlists/${uuid}?${this.params}`,
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get playlist tracks by playlist uuid
  * @param {string} uuid - playlist uuid
  * @example tidal.getPlaylistTracks('1c5d01ed-4f05-40c4-bd28-0f73099e9648')
  * @returns {Promise}
  * @fulfil {Array} - an array of track objects
  * @reject {Error}
  * @see {@link Tidal#getTrack} - track object example
  */
  async getPlaylistTracks(uuid) {

    try {
      const res = await this.api({
        method: 'GET',
        url: `/playlists/${uuid}/tracks?${this.params}`,
      });

      return res.data.items;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get your favorite (starred) playlists (requires login() to be called)
  * @example tidal.getFavoritePlaylists()
  * @returns {Promise}
  * @fulfil {Array} - an array of playlist objects
  * @reject {Error}
  * @see {@link Tidal#login} - login method must be called first
  * @see {@link Tidal#getPlaylist} - playlist object example
  */
  async getFavoritePlaylists() {

    if (!this.userId || !this.sessionId) {
      throw new Error('You must call the login method first');
    }

    try {

      const res = await this.api({
        method: 'GET',
        url: `/users/${this.userId}/favorites/playlists?${this.params}`,
      });

      const { items } = res.data;

      const playlists = items.map(item => item.item);

      return playlists;
    } catch (e) {
      throw e;
    }
  }

  /**
  * get valid urls to artist pictures
  * @param {string} uuid - artist picture uuid (can be found as picture property in artist object)
  * @example tidal.artistPicToUrl('04d63cd8-a1a5-42e0-b1ec-8e336b7d9200')
  * // returns
  {
    sm: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/160x107.jpg',
    md: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/320x214.jpg',
    lg: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/640x428.jpg'
  }
  * @returns {Object}
  */
  artistPicToUrl(uuid) {
    const baseUrl = `https://resources.tidal.com/images/${uuid.replace(/-/g, '/')}`;
    return {
      sm: `${baseUrl}/160x107.jpg`,
      md: `${baseUrl}/320x214.jpg`,
      lg: `${baseUrl}/640x428.jpg`,
    };
  }

  /**
  * get valid urls to album art
  * @param {string} uuid - album art uuid (can be found as cover property in album object)
  * @example tidal.albumArtToUrl('9a56f482-e9cf-46c3-bb21-82710e7854d4')
  * // returns
  {
    sm: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/160x160.jpg',
    md: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/320x320.jpg',
    lg: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/640x640.jpg',
    xl: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/1280x1280.jpg'
  }
  * @returns {Object}
  */
  albumArtToUrl(uuid) {
    const baseUrl = `https://resources.tidal.com/images/${uuid.replace(/-/g, '/')}`;
    return {
      sm: `${baseUrl}/160x160.jpg`,
      md: `${baseUrl}/320x320.jpg`,
      lg: `${baseUrl}/640x640.jpg`,
      xl: `${baseUrl}/1280x1280.jpg`,
    };
  }

}

export default Tidal;
