process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const {
  after, describe, before, it,
} = require('mocha');

const { connect, disconnect } = require('../../server');
const app = require('../../routes/users');

const userTemplate = {
  firstName: 'USER FIRST',
  lastName: 'USER LAST',
  email: 'USER@EMAIL.com',
  password: 'PASSWORD',
};

describe('POST /users', () => {
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
  it('Create new user', (done) => {
    request(app)
      .post('/')
      .send(userTemplate)
      .expect(201)
      .then((res) => {
        console.log(`Post OK = ${res.ok}`);
      })
      .then(() => {
        request(app)
          .get('/')
          .then((res) => {
            console.log('res.body.length = ', res.body.length);
            expect(res.body.length).to.equal(1);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
