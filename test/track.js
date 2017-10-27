import { expect } from 'chai';
import Tidal from '../src';

const tidal = new Tidal();

describe('getTrack', () => {

  it('should return the correct track object', async () => {
    const track = await tidal.getTrack(64975224);

    expect(track).to.be.an('object')
      .and.to.include({ id: 64975224 });

  });

});
