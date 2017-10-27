import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('getTrack', () => {

  it('should return an object', async () => {
    const track = await tidal.getTrack(64975224);
    expect(track).to.be.an('object');
  });

  it('should return the correct track', async () => {
    const track = await tidal.getTrack(64975224);
    expect(track).to.include({ id: 64975224 });
  });

  it('should throw an error for an invalid id', () => {
    expect(tidal.getTrack(1234321)).to.be.rejectedWith(Error);
  });

});
