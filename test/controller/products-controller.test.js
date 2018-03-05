let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let should = chai.should();
const products = require('../../src/routes/products');
const server = require('../../index.js');

chai.use(chaiHttp);

describe("Products controller", function(){
  describe("#GET /products/:id", function(){
    it("returns status code 200", function(done){
      chai.request(server)
        .get('/products/5')
        .end((err, res) => {
          res.should.have.status(200);
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
      .get('/products/5')
      .end((err, res) => {
        res.body.should.have.property('name');
        res.body.should.have.property('current_price');
        expect(res.body.current_price).to.have.property('value');
        expect(res.body.current_price).to.have.property('currency');
        res.body.should.have.property('createdAt');
        done();
      });
    });

  });
});
