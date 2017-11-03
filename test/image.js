import { expect } from 'chai';
import Tidal from '../src';

const tidal = new Tidal();

describe('images', () => {

  describe('artistPicToUrl', () => {

    it('should return an object with the correct sm, md, lg properties', () => {

      expect(tidal.artistPicToUrl('04d63cd8-a1a5-42e0-b1ec-8e336b7d9200'))
        .to.deep.equal({
          sm: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/160x107.jpg',
          md: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/320x214.jpg',
          lg: 'https://resources.tidal.com/images/04d63cd8/a1a5/42e0/b1ec/8e336b7d9200/640x428.jpg',
        });

    });

  });

  describe('albumArtToUrl', () => {

    it('should return an object with the correct sm, md, lg, xl properties', () => {

      expect(tidal.albumArtToUrl('9a56f482-e9cf-46c3-bb21-82710e7854d4'))
        .to.deep.equal({
          sm: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/160x160.jpg',
          md: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/320x320.jpg',
          lg: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/640x640.jpg',
          xl: 'https://resources.tidal.com/images/9a56f482-e9cf-46c3-bb21-82710e7854d4/1280x1280.jpg',
        });

    });

  });

});
