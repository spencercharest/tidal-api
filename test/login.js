import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dotenv from 'dotenv';
import Tidal from '../src';

chai.use(chaiAsPromised);

dotenv.config();

const tidal = new Tidal();

describe('login', () => {

  it('should return user and session data', async () => {

    const data = await tidal.login(process.env.USERNAME, process.env.PASSWORD);

    expect(data).to.be.an('object');

    expect(data).to.have.property('sessionId');

    expect(data).to.have.property('userId');

  });

  it('should throw an error if username or password are not provided', () => expect(tidal.login()).to.eventually.be.rejectedWith(Error));

});

