const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../app.js');

const User = require('../models/User');

chai.should();
chai.use(chaiHttp);

describe('Mocha test for auth controller', () => {
  beforeEach(async () => {
    await new User({
      username: 'Bilush',
      email: 'bilush@gmail.com',
      password: '1234567',
    }).save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });
  const message = 'You have successfully logged out';

  describe('GET /auth/logout ', () => {
    it('should return a successful response', async () => {
      const res = await chai.request(app).get('/auth/logout');

      res.should.have.status(200);
      res.text.should.equal(message);
    });
  });

  describe('POST /auth/register', () => {
    it('should create a new user', async () => {
      const username = 'newUser';
      const email = 'example@example.com';
      const password = '1234567';
      const res = await chai
        .request(app)
        .post('/auth/register')
        .send({ username, email, password });
      res.should.have.status(201);
      res.body.success.user.should.have.property('id');
      res.body.success.user.should.have.property('username');
      res.body.success.user.should.have.property('email');
    });
  });
});
