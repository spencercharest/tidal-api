import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('getAlbum', () => {

  it('should return an object', async () => {
    const album = await tidal.getAlbum(47768638);
    expect(album).to.be.an('object');
  });

  it('should return the correct album', async () => {
    const album = await tidal.getAlbum(47768638);
    expect(album).to.include({ id: 47768638 });
  });

  it('should throw an error for an invalid id', async () =>
    expect(tidal.getAlbum(4776)).to.be.rejectedWith(Error));

});
