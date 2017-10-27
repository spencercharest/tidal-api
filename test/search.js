import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('search', () => {

  it('should return an array of 25 track objects', async () => {
    const tracks = await tidal.search('adele', 'tracks', 25);
    expect(tracks).to.be.an('array')
      .and.to.have.lengthOf(25);

    expect(tracks[0]).to.be.an('object')
      .and.to.have.property('trackNumber');
  });

  it('should throw an error when type is undefined', () =>
    expect(tidal.search('adele')).to.be.rejectedWith(Error));

  it('should throw an error when type is not valid', () =>
    expect(tidal.search('adele', 'wrong')).to.be.rejectedWith(Error));

});
