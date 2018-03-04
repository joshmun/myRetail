const mongoose = require('mongoose')
const common = require('../../config/common');
const config = common.config();

mongoose.connect(config.mongoURI, function(err){
  console.log(err);
});
const db = mongoose.connection;

const expect = require('chai').expect;
const Product = require('../../src/model/models');


describe('Product', function() {

  it('saves successfully with valid input', function(done){
    const p = new Product({
                name: 'Movie',
                current_price: {
                  value: 13.49,
                  currency_code: 'USD'
                  }
                });
    p.save(function(err) {
      expect(err.errors).to.not.exist;
    })
    done();
  });

  it('saves unsuccessfully with invalid input', function(done){
    const p = new Product({
                name: 1234,
                current_price: {
                  value: 'whatever',
                  currency_code: true
                  }
                });
    p.save(function(err) {
      expect(err.errors).to.exist;
    });
    done();
  });

  describe('#name', function() {
    it('should be valid when name is Movie', function(done){
      const p = new Product({ name: 'Movie' });
      p.validate(function(err) {
        expect(err.errors.name).to.not.exist;
        done();
      });
    });

    it('should be invalid if name is empty', function(done){
      const p = new Product();
      p.validate(function(err) {
        expect(err.errors.name).to.exist;
        done();
      });
    });

    it('should be invalid when name is numbers 123', function(done){
      const p = new Product({ name: 123 });
      p.save(function(err) {
        expect(err.errors.name).to.exist;
      });
      done();
    });
  });

  describe('#current_price', function(){
    it('should be valid when value is 13.49', function(done){
      const p = new Product({ value: 13.49 });
      p.validate(function(err) {
        expect(err.errors.value).to.not.exist;
      });
      done();
    });

    it('should be valid when value is 1300', function(done) {
      const p = new Product({ value: 1300 });
      p.validate(function(err) {
        expect(err.errors.value).to.not.exist;
      });
      done();
    });

    it('should be invalid when value is a string', function(done){
      const p = new Product({ value: '13.49' });
      p.save(function(err) {
        expect(err.errors.value).to.exist;
      });
      done();
    });

    it('should be valid when currency is a string USD', function(done){
      const p = new Product({ currency: 'USD' });
      p.validate(function(err) {
        expect(err.errors.value).to.not.exist;
      });
      done();
    });

    it('should be invalid when currency is not a string', function(done){
      const p = new Product({ currency: true });
      p.validate(function(err) {
        expect(err.errors.value).to.exist;
      });
      done();
    });
  })

  db.dropDatabase(function(err){
    if(err) return done(err);
  });
});
