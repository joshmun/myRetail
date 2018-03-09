let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();
const server = require("../../index.js");
const Product = require("../../src/model/product-model");

chai.use(chaiHttp);

describe("Products Controller", function() {
  let productId = 12345;
  let myId;

  after(() => {
    Product.findByIdAndRemove(myId).exec();
  });

  describe("#GET when product exists in Redsky and MongoDb", function() {
    before(() => {
      const p = new Product({
        product_id: productId,
        current_price: {
          value: 123,
          currency_code: "USD"
        }
      });
      myId = p.id;
      p.save();
    });

    describe("/products/:id", function() {
      it("returns status code 200", function(done) {
        chai
          .request(server)
          .get(`/products/${13860428}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("returns expected JSON product data", done => {
        chai
          .request(server)
          .get(`/products/${13860428}`)
          .end((err, res) => {
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("product_id");
            res.body.should.have.property("current_price");
            expect(res.body.current_price).to.have.property("value");
            expect(res.body.current_price).to.have.property("currency_code");
            done();
          });
      });

      it("returns status code 404 if id found by db, but not by Axios", function(done) {
        chai
          .request(server)
          .get(`/products/${myId}`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });

      it("returns expected error message if id found by db, but not by Axios", function(done) {
        chai
          .request(server)
          .get(`/products/${myId}`)
          .end((err, res) => {
            expect(res.body.error).to.equal(
              "Sorry, redsky did not respond with product data with this id."
            );
            done();
          });
      });

      it("returns status code 404 if id found by Axios, but not in db", function(done) {
        chai
          .request(server)
          .get(`/products/16696652`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });

      it("returns expected error message if not found in db, but found by axios", function(done) {
        chai
          .request(server)
          .get(`/products/16696652`)
          .end((err, res) => {
            expect(res.body.error).to.equal(
              "Sorry, we could not find this product."
            );
            done();
          });
      });
    });
  });

  describe("#PUT /products/:id", () => {
    after(done => {
      chai
        .request(server)
        .put("/products/13860428?value=43")
        .end((err, res) => {
          done();
        });
    });

    it("returns status code 200", done => {
      chai
        .request(server)
        .put("/products/13860428?value=42.42")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("returns expected success message on valid id", done => {
      chai
        .request(server)
        .put("/products/13860428?value=42.42")
        .end((err, res) => {
          expect(res.body.message).to.equal("Successfully updated!");
          done();
        });
    });

    it("returns expected fail message on invalid id", done => {
      chai
        .request(server)
        .put("/products/98765")
        .query({ value: 42.42 })
        .end((err, res) => {
          expect(res.body.error).to.equal(
            "Sorry, we could not find this product."
          );
          done();
        });
    });

    it("returns expected fail message on invalid pricing information", done => {
      chai
        .request(server)
        .put("/products/13860428")
        .query({ value: "onetwothree" })
        .end((err, res) => {
          expect(res.body.error).to.equal(
            "Requested pricing update information was malformed."
          );
          done();
        });
    });
  });
});
