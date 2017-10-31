import chai, { expect } from 'chai';
import nock from 'nock';
import chaiAsPromised from 'chai-as-promised';
import Tidal from '../src';

chai.use(chaiAsPromised);

const tidal = new Tidal();

describe('tidal methods', () => {

  describe('login', () => {

    afterEach(() => {
      nock.cleanAll();
    });

    it('should store neccessary credentials as class properties', async () => {

      // mock the api response
      nock('https://api.tidal.com/v1')
        .post('/login/username')
        .query(true)
        .reply(200, {
          userId: 46794576,
          sessionId: '51bd6665-9349-4d7f-9b98-c47abb95b47d',
          countryCode: 'US',
        });

      await tidal.login('example@example.com', 'password');

      expect(tidal.sessionId).to.equal('51bd6665-9349-4d7f-9b98-c47abb95b47d');

      expect(tidal.countryCode).to.equal('US');

      expect(tidal.params).to.equal('limit=999&countryCode=US&sessionId=51bd6665-9349-4d7f-9b98-c47abb95b47d');

    });

    it('should throw an error when username or password are not provided', () => {

      expect(tidal.login('example@example.com')).to.be.rejectedWith(Error);

    });

  });

});
