const expect = require('chai').expect;
const Product = require('../../src/model/models');

describe('Product', function() {
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
      const p = new Product({ name: 123 })
      p.save(function(err) {
        expect(err.errors.name).to.exist;
      })
      done();
    });
  });
});
