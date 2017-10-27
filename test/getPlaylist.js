import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('getPlaylist', () => {

  it('should return an object', async () => {
    const playlist = await tidal.getPlaylist('1c5d01ed-4f05-40c4-bd28-0f73099e9648');
    expect(playlist).to.be.an('object');
  });

  it('should return the correct result', async () => {
    const playlist = await tidal.getPlaylist('1c5d01ed-4f05-40c4-bd28-0f73099e9648');
    expect(playlist).to.include({ uuid: '1c5d01ed-4f05-40c4-bd28-0f73099e9648' });
  });

  it('should throw an error when an invalid uuid is used', () => {
    expect(tidal.getPlaylist('error'))
      .to.be.rejectedWith(Error);
  });

});
