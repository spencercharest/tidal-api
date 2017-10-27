import axios from 'axios';
import 'babel-polyfill';

/** Class */
class Tidal {

  constructor() {
    this.url = 'https://api.tidal.com/v1';
    this.webToken = 'wdgaB1CilGA-S_s2';
    this.androidToken = 'kgsOOmYk3zShYrNP';
    this.iosToken = 'GvFhCVAYp3n43EN3';
    this.countryCode = 'NO';
    // current ios and android app versions
    this.appVersion = '2.1.2';
    this.api = axios.create({
      baseURL: this.url,
      headers: {
        'x-tidal-token': this.webToken,
      },
    });
  }

  /**
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
  * @param {number} id - track id
  */
  async getTrack(id) {
    try {
      const res = await this.api({
        method: 'GET',
        url: `/tracks/${id}?countryCode=${this.countryCode}`,
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

}

export default Tidal;
