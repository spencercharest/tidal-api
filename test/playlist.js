import { expect } from 'chai';
import Tidal from '../src';

const tidal = new Tidal();

describe('playlist', () => {

  describe('getPlaylist', () => {

    it('should return the correct playlist object', async () => {
      const playlist = await tidal.getPlaylist('1c5d01ed-4f05-40c4-bd28-0f73099e9648');

      expect(playlist).to.be.an('object')
        .and.to.include({ uuid: '1c5d01ed-4f05-40c4-bd28-0f73099e9648' });

    });

  });

  describe('getPlaylistTracks', () => {

    it('should return an array of track objects from the specified playlist', async () => {
      const tracks = await tidal.getPlaylistTracks('1c5d01ed-4f05-40c4-bd28-0f73099e9648');
      const track = tracks[0];

      expect(tracks).to.be.an('array');

      expect(track).to.be.an('object')
        .and.to.have.property('trackNumber');
    });

  });

});
