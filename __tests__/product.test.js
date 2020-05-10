/* eslint-disable no-undef, handle-callback-err, no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

chai.use(chaiHttp);

const { expect } = chai;

let normalToken1 = '';
let normalToken2 = '';
let associationToken = '';

before((done) => {
  chai
    .request(app)
    .post('/api/auth/sign_in')
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
    .post('/api/auth/sign_in')
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
describe('Product test', () => {
  before((done) => {
    chai
      .request(app)
      .get(`/api/auth/join/associations/${1}`)
      .set('authorization', `Bearer ${normalToken1}`)
      .end((err, res) => {
        associationToken = res.body.token;
        done();
      });
  });

  describe('Create product test', () => {
    it('Should pass whether user belongs to an association or not', (done) => {
      chai
        .request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${associationToken}`)
        .send({
          name: 'product1',
          description: 'Description for product1',
          images: ['http://image.com/association1.jpg']
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('product').to.be.an('object');
          done();
        });
    });
  });

  describe('fetch one or more products test', () => {
    it('Should fail if one product is not found', (done) => {
      chai
        .request(app)
        .get(`/api/products/${1000}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error').eql('Wrong product ID');
          done();
        });
    });

    it('Should fetch all products', (done) => {
      chai
        .request(app)
        .get('/api/products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('products').to.be.an('array');
          done();
        });
    });

    it('Should pass for fetching first product', (done) => {
      chai
        .request(app)
        .get(`/api/products/${1}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('product').to.be.an('object');
          done();
        });
    });
  });

  describe('Update and delete products', () => {
    it('Should update the first product', (done) => {
      chai
        .request(app)
        .put(`/api/products/${1}`)
        .set('authorization', `Bearer ${associationToken}`)
        .send({
          name: 'updated product',
          images: ['https://images.com/updatedProduct.png']
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('product').to.be.an('object');
          expect(res.body.product.name).eql('updated product');
          done();
        });
    });

    it('Should fail to update the first product if images is not an array', (done) => {
      chai
        .request(app)
        .put(`/api/products/${1}`)
        .set('authorization', `Bearer ${associationToken}`)
        .send({
          name: 'updated product',
          images: 'https://images.com/updatedProduct.png'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error').eql('images should be an array');
          done();
        });
    });

    it('Should delete the third product', (done) => {
      chai
        .request(app)
        .delete(`/api/products/${3}`)
        .set('authorization', `Bearer ${associationToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
