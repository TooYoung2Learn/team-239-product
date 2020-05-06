/* eslint-disable no-undef, handle-callback-err, no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Community test', () => {
  let normalToken;
  let adminToken;

  before((done) => {
    chai
      .request(app)
      .post('/api/auth/sign_up')
      .send({
        name: 'Normal user',
        email: 'normaluser@example.com',
        password: 'password1'
      })
      .end((err, res) => {
        normalToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/auth/sign_up')
      .send({
        name: 'Admin user',
        email: 'adminuser@example.com',
        password: 'password1',
        role: 'admin'
      })
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

  describe('Create community test', () => {
    it('Should fail if user is not an admin', (done) => {
      chai
        .request(app)
        .post('/api/communities')
        .set('Authorization', `Bearer ${normalToken}`)
        .send({
          name: 'community1',
          description: 'Description for community1',
          image: 'http://image.com/community1.jpg'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error').eql('Unauthorize access');
          done();
        });
    });

    it('Should pass if user is an admin', (done) => {
      chai
        .request(app)
        .post('/api/communities')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'community1',
          description: 'Description for community1',
          image: 'http://image.com/community1.jpg'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('community').to.be.an('object');
          done();
        });
    });
  });

  describe('fetch one or more communities test', () => {
    it('Should fail if community not found', (done) => {
      chai
        .request(app)
        .get(`/api/communities/${1000}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').eql('The community with that Id is not found');
          done();
        });
    });

    it('Should pass whether the user is admin or not', (done) => {
      chai
        .request(app)
        .get('/api/communities')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('communities').to.be.an('array');
          done();
        });
    });

    it('Should pass for fetching first community', (done) => {
      chai
        .request(app)
        .get(`/api/communities/${1}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('community').to.be.an('object');
          done();
        });
    });
  });

  describe('Update and delete community', () => {
    it('Should update the first community', (done) => {
      chai
        .request(app)
        .put(`/api/communities/${1}`)
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          name: 'updated community'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('community').to.be.an('object');
          expect(res.body.community.name).eql('updated community');
          done();
        });
    });

    it('Should delete the fifth community', (done) => {
      chai
        .request(app)
        .delete(`/api/communities/${5}`)
        .set('authorization', `Barer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
