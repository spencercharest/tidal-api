import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('track', () => {

  describe('getTrack', () => {

    it('should return the correct track object', async () => {
      const track = await tidal.getTrack(64975224);

      expect(track).to.be.an('object')
        .and.to.include({ id: 64975224 });

    });

  });

  describe('getFavoriteTracks', () => {

    it('should reject if login() has not been called', () => expect(tidal.getFavoriteTracks()).to.eventually.be.rejectedWith(Error));

    it('should return an array of track objects', async () => {

      await tidal.login(process.env.USERNAME, process.env.PASSWORD);
      const favorites = await tidal.getFavoriteTracks();
      const track = favorites[0];

      expect(favorites).to.be.an('array');

      expect(track).to.be.an('object');
      expect(track).to.have.property('title');
      expect(track).to.have.property('album');


    });

  });

});
