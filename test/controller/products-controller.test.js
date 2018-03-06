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

const p = new Product({
  _id: new mongoose.Types.ObjectId(),
  name: "movie",
  current_price: {
    value: 123,
    currency_code: "USD"
  }
})

chai.use(chaiHttp);

describe("Products controller", function(){
  describe("#GET /products/:id", function(){
    it("returns status code 200", function(done){
      p.save()
      chai.request(server)
        .get(`/products/${p._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          Product.findByIdAndRemove(p.id);
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
      p.save()
      chai.request(server)
      .get(`/products/${p._id}`)
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
