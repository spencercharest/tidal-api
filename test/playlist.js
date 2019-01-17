import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

describe('playlist', () => {
  let tidal;

  beforeEach(() => {
    tidal = new Tidal();
  });

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

  describe('getFavoritePlaylists', () => {
    it('should reject if login() has not been called', () => {
      expect(tidal.getFavoritePlaylists()).to.eventually.be.rejectedWith(Error);
    });

    it('should return an array of playlist objects', async () => {
      await tidal.login(process.env.USERNAME, process.env.PASSWORD);
      const favorites = await tidal.getFavoritePlaylists();
      const playlist = favorites[0];

      expect(favorites).to.be.an('array');

      expect(playlist).to.be.an('object')
        .and.to.have.property('uuid');
    });

  });

  describe('getPlaylists', () => {
    it('should reject if login() has not been called', () => expect(tidal.getPlaylists()).to.eventually.be.rejectedWith(Error));

    it('should return an array of playlist objects', async () => {
      await tidal.login(process.env.USERNAME, process.env.PASSWORD);
      const playlists = await tidal.getPlaylists();
      const playlist = playlists[0];

      expect(playlists).to.be.an('array')
        .and.to.have.lengthOf(1);

      expect(playlist).to.be.an('object')
        .and.to.have.property('uuid');
    });

  });

});
