const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../app.js');

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

chai.should();
chai.use(chaiHttp);

describe('Authentication', () => {
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

  describe('GET /auth/logout', () => {
    const message = 'You have successfully logged out';

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

    it('should return 400 if user already register', async () => {
      const username = 'abcdef';
      const email = 'bilush@gmail.com';
      const password = '643434u34';
      const res = await chai
        .request(app)
        .post('/auth/register')
        .send({ username, email, password });

      res.should.have.status(400);
    });
    it('should return 400 if username is empty', async () => {
      const username = '';
      const email = 'bilush1@gmail.com';
      const password = '643434u34';
      const res = await chai
        .request(app)
        .post('/auth/register')
        .send({ username, email, password });

      res.should.have.status(400);
    });
    it('should return 400 if email is invalid', async () => {
      const username = 'abcsdetg';
      const email = 'bilushgmail.com';
      const password = '643434u34';
      const res = await chai
        .request(app)
        .post('/auth/register')
        .send({ username, email, password });

      res.should.have.status(400);
    });
    it('should return 400 if password is less than 6 characters', async () => {
      const username = 'abcsdetg';
      const email = 'bilush2@gmail.com';
      const password = '12345';
      const res = await chai
        .request(app)
        .post('/auth/register')
        .send({ username, email, password });

      res.should.have.status(400);
    });
  });

  describe('POST /auth/login', () => {
    it('should login user', async () => {
      const email = 'bilush@gmail.com';
      const password = '1234567';
      const res = await chai
        .request(app)
        .post('/auth/login')
        .send({ email, password });
      res.should.have.status(200);
      res.body.success.user.should.have.property('id');
      res.body.success.user.should.have.property('username');
      res.body.success.user.should.have.property('email');
    });
    it('should return 401 if invalid email ', async () => {
      const email = 'bilush!@gmail.com';
      const password = '1234567';
      const res = await chai
        .request(app)
        .post('/auth/login')
        .send({ email, password });
      res.should.have.status(401);
    });
    it('should return 401 if invalid password ', async () => {
      const email = 'bilush@gmail.com';
      const password = '12345678';
      const res = await chai
        .request(app)
        .post('/auth/login')
        .send({ email, password });
      res.should.have.status(401);
    });
    it('should return 400 for bad request ', async () => {
      const res = await chai.request(app).post('/auth/login');
      res.should.have.status(400);
    });
  });

  describe('GET /auth/user', () => {
    it('should return 401 if no token is provided ', async () => {
      const res = await chai.request(app).get('/auth/user');
      res.should.have.status(401);
    });

    it('should load user', async () => {
      const user = await new User({
        username: 'Lukman',
        email: 'lukman@gmail.com',
        password: '1234567',
      }).save();

      const token = generateToken(user._id);
      const res = await chai
        .request(app)
        .get('/auth/user')
        .set('Cookie', `token=${token}`);
      res.should.have.status(200);
      res.body.success.user.should.have.property('id');
      res.body.success.user.should.have.property('username');
      res.body.success.user.should.have.property('email');
    });
  });
});
