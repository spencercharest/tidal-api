import { expect } from 'chai';
import Tidal from '../src';

describe('Tidal', () => {

  it('should be instantiated with default options', () => {
    const tidal = new Tidal();

    expect(tidal.countryCode).to.equal('US');

    expect(tidal.limit).to.equal(1000);
  });

  it('should be instantiated with custom options', () => {

    const tidal = new Tidal({
      countryCode: 'DK',
      limit: 500,
    });

    expect(tidal.countryCode).to.equal('DK');

    expect(tidal.limit).to.equal(500);
  });

});

