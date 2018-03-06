const mongoose = require('mongoose')
const common = require('../../config/common');
const config = common.config();
mongoose.connect(config.mongoURI);
const db = mongoose.connection;
const Product = require('../model/models');
const faker = require('faker');

module.exports = {
  seed: ()=>{
    for (let i=1; i<11; i++){
      const p = new Product({
        _id: i,
        name: faker.commerce.productName(),
        current_price: {
          value: faker.finance.amount(),
          currency_code: "USD"
          },
        });
      p.save();
    }
  },
  drop: ()=>{
    db.dropDatabase(function(err){
      if(err) return done(err);
    }, console.log("database dropped"));
  }
}
