const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let should = chai.should();
const products = require('../../src/routes/products');
const server = require('../../index.js');
const Product = require('../../src/model/models');

const db = mongoose.connection
let myId;

chai.use(chaiHttp);

describe("Products controller", function(){
  before(()=>{
    const p = new Product({
      name: "movie",
      current_price: {
        value: 123,
        currency_code: "USD"
      }
    })
    myId = p.id;
    p.save()
  });

  after(()=>{
    Product.findByIdAndRemove(myId).exec();
  });

  describe("#GET /products", function(){
    it("returns status code 200", function(done){
      chai.request(server)
      .get('/products')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe("#GET /products/:id", function(){
    it("returns status code 200", function(done){
      chai.request(server)
        .get(`/products/${myId}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("returns status code 404 if ID not found", function(done){
      chai.request(server)
        .get('/products/500010100001003939320')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("returns JSON product data", (done) => {
      chai.request(server)
      .get('/products/5')
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
    });

    it("returns a Product object", (done) => {
      chai.request(server)
      .get(`/products/${myId}`)
      .end((err, res) => {
        res.body.should.have.property('name');
        res.body.should.have.property('current_price');
        expect(res.body.current_price).to.have.property('value');
        expect(res.body.current_price).to.have.property('currency_code');
        res.body.should.have.property('createdAt');
        done();
      });
    });
  });
});