import { expect } from 'chai';
import Tidal from '../src';

const tidal = new Tidal();

describe('artist', () => {

  describe('getArtist', () => {

    it('should return the expected artist object', async () => {
      const artist = await tidal.getArtist(3575680);

      expect(artist).to.be.an('object')
        .and.to.include({ id: 3575680 });

    });

  });

  describe('getArtistAlbums', () => {

    it('should return an array of album objects', async () => {
      const albums = await tidal.getArtistAlbums(3575680);

      expect(albums).to.be.an('array');
      expect(albums[0]).to.be.an('object')
        .and.to.include({ type: 'ALBUM' });

    });

  });

  describe('getArtistEPsAndSingles', () => {

    it('should return an array of album objects', async () => {
      const albums = await tidal.getArtistEPsAndSingles(3575680);

      expect(albums).to.be.an('array')
        .and.to.have.lengthOf.above(0);

      expect(albums[0]).to.be.an('object');

    });
  });

  describe('getArtistCompilations', () => {

    it('should return an array of album objects', async () => {
      const albums = await tidal.getArtistCompilations(3575680);

      expect(albums).to.be.an('array')
        .and.to.have.lengthOf.above(0);

      expect(albums[0]).to.be.an('object');

    });
  });

});
