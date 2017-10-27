import chai, { expect } from 'chai';
import chaiThings from 'chai-things';
import Tidal from '../src';

chai.use(chaiThings);

const tidal = new Tidal();

describe('search', () => {

  it('should return an array', async () => {
    const tracks = await tidal.search('adele', 'tracks');
    expect(tracks).to.be.an('array');
  });

  it('should return results', async () => {
    const tracks = await tidal.search('adele', 'tracks');
    expect(tracks).to.have.lengthOf.above(0);
  });

  it('should return the number of results specified', async () => {
    const tracks = await tidal.search('adele', 'tracks', 25);
    expect(tracks).to.all.have.lengthOf(25);
  });

  it('should return only the specified type', async () => {
    const tracks = await tidal.search('adele', 'tracks');
    expect(tracks).to.all.have.property('trackNumber');
  });
});
