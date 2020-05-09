/* eslint-disable no-undef, handle-callback-err, no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

chai.use(chaiHttp);

const { expect } = chai;

let normalToken1 = '';
let normalToken2 = '';
let communityToken = '';

before((done) => {
  chai
    .request(app)
    .post('/api/auth/sign_up')
    .send({
      name: 'Normal user1',
      email: 'normaluser1@example.com',
      password: 'password1'
    })
    .end((err, res) => {
      normalToken1 = res.body.token;
      done();
    });
});

before((done) => {
  chai
    .request(app)
    .post('/api/auth/sign_up')
    .send({
      name: 'Normal user2',
      email: 'normaluser2@example.com',
      password: 'password1'
    })
    .end((err, res) => {
      normalToken2 = res.body.token;
      done();
    });
});
describe('Association test', () => {
  before((done) => {
    chai
      .request(app)
      .get(`/api/auth/join/communities/${3}`)
      .set('authorization', `Bearer ${normalToken1}`)
      .end((err, res) => {
        communityToken = res.body.token;
        done();
      });
  });

  describe('Create association test', () => {
    it('Should fail if user does not belong to a community', (done) => {
      chai
        .request(app)
        .post('/api/associations')
        .set('Authorization', `Bearer ${normalToken2}`)
        .send({
          name: 'association1',
          description: 'Description for association1',
          image: 'http://image.com/association1.jpg'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error').eql('You must be part of a community to create an association');
          done();
        });
    });

    it('Should pass if user belongs to a community', (done) => {
      chai
        .request(app)
        .post('/api/associations')
        .set('Authorization', `Bearer ${communityToken}`)
        .send({
          name: 'association1',
          description: 'Description for association1',
          image: 'http://image.com/association1.jpg'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('association').to.be.an('object');
          done();
        });
    });
  });

  describe('fetch one or more associations test', () => {
    it('Should fail if one association is not found', (done) => {
      chai
        .request(app)
        .get(`/api/associations/${1000}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('Should pass whether the user is admin or not', (done) => {
      chai
        .request(app)
        .get('/api/associations')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('associations').to.be.an('array');
          done();
        });
    });

    it('Should pass for fetching first association', (done) => {
      chai
        .request(app)
        .get(`/api/associations/${1}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('association').to.be.an('object');
          done();
        });
    });
  });

  describe('Update and delete associations', () => {
    it('Should update the first association', (done) => {
      chai
        .request(app)
        .put(`/api/associations/${1}`)
        .set('authorization', `Bearer ${communityToken}`)
        .send({
          name: 'updated association'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('association').to.be.an('object');
          expect(res.body.association.name).eql('updated association');
          done();
        });
    });

    it('Should delete the third association', (done) => {
      chai
        .request(app)
        .delete(`/api/associations/${3}`)
        .set('authorization', `Bearer ${communityToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
