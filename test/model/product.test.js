
const Product = require("../../src/model/product-model");
const expect = require("chai").expect;
describe("Product", function() {
  it("should be valid with correct input", function(done) {
    const p = new Product({
      product_id: 510314,
      current_price: {
        value: 13.49,
        currency_code: "USD"
      }
    });
    p.validate(function(err) {
      expect(err.errors).to.not.exist;
    });
    done();
  });

  describe("#product_id", function() {
    it("should be valid when product_id is 3146694", function(done) {
      const p = new Product({ product_id: 3146694 });
      p.validate(function(err) {
        expect(err.errors.product_id).to.not.exist;
        done();
      });
    });

    it("should be invalid if product_id is empty", function(done) {
      const p = new Product();
      p.validate(function(err) {
        expect(err.errors.product_id).to.exist;
        done();
      });
    });

    it("should be invalid when product_id is string onetwo", function(done) {
      const p = new Product({ product_id: "onetwo" });
      p.validate(function(err) {
        expect(err.errors.product_id).to.exist;
      });
      done();
    });
  });

  describe("#current_price", function() {
    it("should be valid when value is 13.49", function(done) {
      const p = new Product({ value: 13.49 });
      p.validate(function(err) {
        expect(err.errors.value).to.not.exist;
      });
      done();
    });

    it("should be valid when value is 1300", function(done) {
      const p = new Product({ value: 1300 });
      p.validate(function(err) {
        expect(err.errors.value).to.not.exist;
      });
      done();
    });

    it("should be invalid when value is a string", function(done) {
      const p = new Product({ value: "13.49" });
      p.validate(function(err) {
        expect(err.errors.value).to.exist;
      });
      done();
    });

    it("should be valid when currency is a string USD", function(done) {
      const p = new Product({ currency: "USD" });
      p.validate(function(err) {
        expect(err.errors.value).to.not.exist;
      });
      done();
    });

    it("should be invalid when currency is not a string", function(done) {
      const p = new Product({ currency: true });
      p.validate(function(err) {
        expect(err.errors.value).to.exist;
      });
      done();
    });
  });
});
