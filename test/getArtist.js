import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('getArtist', () => {

  it('should return an object', async () => {
    const artist = await tidal.getArtist(3575680);
    expect(artist).to.be.an('object');
  });

  it('should return the correct result', async () => {
    const artist = await tidal.getArtist(3575680);
    expect(artist).to.include({ id: 3575680 });
  });

  it('should throw an error for an invalid id', () => {
    expect(tidal.getArtist(35780)).to.be.rejectedWith(Error);
  });
});
