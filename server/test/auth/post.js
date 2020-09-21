process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const {
  after, describe, before, it,
} = require('mocha');

const { connect, disconnect } = require('../../server');
const authRoute = require('../../routes/auth');
const userRoute = require('../../routes/users');

const userTemplate = {
  firstName: 'USER FIRST',
  lastName: 'USER LAST',
  email: 'USER@EMAIL.com',
  password: 'PASSWORD',
};

describe('POST /auth/signup', () => {
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
    request(authRoute)
      .post('/signup')
      .send(userTemplate)
      .expect(201)
      .then((res) => {
        console.log(`Post OK = ${res.ok}`);
      })
      .then(() => {
        request(userRoute)
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

describe('POST /auth/signup USER EXISTS', () => {
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
  it('User Exists', (done) => {
    request(authRoute)
      .post('/signup')
      .send(userTemplate)
      .expect(201)
      .then((res) => {
        console.log(`Post OK = ${res.ok}`);
      })
      .then(() => {
        request(authRoute)
          .post('/signup')
          .send(userTemplate)
          .expect(422)
          .then((res) => {
            console.log(`${res.error}`);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});
