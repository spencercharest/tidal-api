import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('album', () => {

  describe('getAlbum', () => {

    it('should return the correct album object', async () => {
      const album = await tidal.getAlbum(80216363);

      expect(album).to.be.an('object')
        .and.to.include({ id: 80216363 });

    });

  });

  describe('getAlbumTracks', () => {

    it('should return an array with the correct number of track objects', async () => {
      const tracks = await tidal.getAlbumTracks(80216363);
      expect(tracks).to.be.an('array')
        .and.to.have.lengthOf(10);

      expect(tracks[0]).to.have.property('trackNumber');

    });

  });

  describe('getTopAlbums', () => {

    it('should return an array with 20 album objects', async () => {

      const albums = await tidal.getTopAlbums();
      expect(albums).to.be.an('array')
        .and.to.have.lengthOf(20);

      expect(albums[0]).to.have.property('numberOfTracks');

    });

  });

  describe('getNewAlbums', () => {

    it('should return an array of album objects', async () => {

      const albums = await tidal.getNewAlbums();

      expect(albums).to.be.an('array');

      expect(albums[0]).to.have.property('numberOfTracks');

    });

  });

  describe('getStaffPickAlbums', () => {

    it('should return an array of album objects', async () => {

      const albums = await tidal.getStaffPickAlbums();

      expect(albums).to.be.an('array');

      expect(albums[0]).to.have.property('numberOfTracks');

    });

  });

  describe('getFavoriteAlbums', () => {

    it('should reject if login() has not been called', () => expect(tidal.getFavoriteAlbums()).to.eventually.be.rejectedWith(Error));

    it('should return an array of album object', async () => {

      await tidal.login(process.env.USERNAME, process.env.PASSWORD);

      const favorites = await tidal.getFavoriteAlbums();
      const album = favorites[0];

      expect(favorites).to.be.an('array');

      expect(album).to.be.an('object')
        .and.to.have.property('title');

    });

  });

});
