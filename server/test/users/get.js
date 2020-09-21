process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const {
  after, describe, before, it,
} = require('mocha');

const { connect, disconnect } = require('../../server');
const app = require('../../routes/users');

describe('GET /users', () => {
  before((done) => {
    connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    disconnect()
      .then(() => done())
      .catch((err) => done(err));
  });
  it('No users in database', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        console.log(`Get OK = ${res.ok}`);
        console.log('res.body.length = ', res.body.length);
        expect(res.body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });
});
