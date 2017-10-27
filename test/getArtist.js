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

  it('should return the correct link to the artist picture', async () => {
    const artist = await tidal.getArtist(3575680);
    expect(artist.picture).to.equal('https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/320x320.jpg');
  });

  it('should throw an error for an invalid id', () =>
    expect(tidal.getArtist(35780)).to.be.rejectedWith(Error));
});
