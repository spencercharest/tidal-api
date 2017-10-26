import axios from 'axios';
import 'babel-polyfill';

export default class Tidal {

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

  async search(query, type, limit = 25) {
    const accTypes = ['artists', 'albums', 'tracks', 'playlists'];

    if (!type) {
      throw new Error('Search requires type as a second argument (artists, albums, tracks, or playlists)');
    }

    if (accTypes.indexOf(type) < 0) {
      throw new Error(`${type} is not a valid search type('artists', 'albums', 'tracks', 'playlists' are valid).`);
    }

    try {
      const { data: { items } } = await this.api({
        method: 'GET',
        url: `/search/${type}?query=${query}&limit=${limit}&countryCode=${this.countryCode}`,
      });

      return items;
    } catch (e) {
      throw e;
    }
  }

}
