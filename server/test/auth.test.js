const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../app.js');

chai.should();
chai.use(chaiHttp);

describe('Mocha test for auth controller', () => {
  const message = 'You have successfully logged out';

  describe('GET /auth/logout ', () => {
    it('should return a successful response', async () => {
      const res = await chai.request(app).get('/auth/logout');

      res.should.have.status(200);
      res.text.should.equal(message);
    });
  });
});
