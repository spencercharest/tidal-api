import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiThings from 'chai-things';
import Tidal from '../src';

chai.use(chaiThings).use(chaiAsPromised);

const tidal = new Tidal();

describe('search', () => {

  it('should return an array', () =>
    expect(tidal.search('adele', 'tracks'))
      .to.eventually.be.an('array'));

  it('should return results for a reasonable query', () =>
    expect(tidal.search('adele', 'tracks'))
      .to.eventually.have.lengthOf.above(0));

  it('should return the number of results specified', () =>
    expect(tidal.search('adele', 'tracks', 25))
      .to.eventually.have.lengthOf(25));

  it('should return only the specified type', () =>
    expect(tidal.search('adele', 'tracks'))
      .to.all.eventually.have.property('trackNumber'));

});
