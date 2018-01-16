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

  describe('getArtistTopTracks', () => {

    it('should return an array of 10 track objects', async () => {
      const tracks = await tidal.getArtistTopTracks(3575680);

      expect(tracks).to.be.an('array')
        .and.to.have.lengthOf(10);

      expect(tracks[0]).to.be.an('object')
        .and.to.have.property('trackNumber');

    });

    it('should return an array of 25 track objects', async () => {
      const tracks = await tidal.getArtistTopTracks(3575680, 25);

      expect(tracks).to.be.an('array')
        .and.to.have.lengthOf(25);
    });
  });

  describe('getSimilarArtists', () => {

    it('should return an array of artist objects', async () => {

      const similar = await tidal.getSimilarArtists(3575680);
      const artist = similar[0];

      expect(similar).to.be.an('array')
        .and.to.have.length.above(0);

      expect(artist).to.be.an('object')
        .and.to.have.property('id');

    });

  });

});
