const mongoose = require('mongoose')
const common = require('../../config/common');
const config = common.config();
mongoose.connect(config.mongoURI);
const db = mongoose.connection;
const Product = require('../model/product-model');
const faker = require('faker');

module.exports = {
  seed: (res)=>{
    for (let i=1; i<11; i++){
      const p = new Product({
        product_id: (i*10000+5555),
        current_price: {
          value: faker.finance.amount(),
          currency_code: "USD"
          },
        });
      p.save((err, product)=> {
        if(err) return res.status(500).send(err);
      });
    }
    return res.status(200).json({message: "Db seeded!"})
  },
  drop: (res)=>{
    db.dropDatabase((err)=>{
      if(err) return res.status(500).send(err);
      const response = {
        message: "Db dropped"
      }
      return res.status(200).send(response)
    });
  }
}
