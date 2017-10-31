import axios from 'axios';
import qs from 'querystring';
import 'babel-polyfill';

/** Class */
class Tidal {

  constructor() {
    this.url = 'https://api.tidal.com/v1';
    this.webToken = 'wdgaB1CilGA-S_s2';
    this.countryCode = 'US';
    this.api = axios.create({
      baseURL: this.url,
      headers: {
        'x-tidal-token': this.webToken,
      },
    });
    // some base params for GET requests
    this.params = `limit=999&countryCode=${this.countryCode}`;
  }

  /**
  * search for an artist, album, track, or playlist
  * @param {string} query - search query
  * @param {string} type - search type ('artists', 'albums', 'tracks', 'playlists')
  * @param {number} [limit] - search limit
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
  * get an album by its id
  * @param {number} id - album id
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

  /**
  * get an artist by its id
  * @param {number} id - artist id
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
  * get a playlist by its uuid
  * @param {string} uuid - playlist uuid
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

  // TODO: getPlaylistTracks

  /**
  * login with username and password
  * @param {string} username - tidal login username or email
  * @param {string} password - tidal login password
  */
  async login(username, password) {

    // make sure username and password are valid
    if (!username || !password) {
      throw new Error('username and password are required arguments');
    }

    try {
      // create the query string for params
      const params = qs.stringify({
        username,
        password,
        token: this.webToken,
      });

      const res = await this.api({
        method: 'POST',
        url: `/login/username?token=${this.webToken}`,
        data: params,
      });

      // store this info for use in other methods
      this.userId = res.data.userId;
      this.sessionId = res.data.sessionId;
      this.countryCode = res.data.countryCode;
      this.params = `${this.params}&sessionId=${res.data.sessionId}`;

      return res.data;
    } catch (e) {
      throw e;
    }
  }

}

export default Tidal;
