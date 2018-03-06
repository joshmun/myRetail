const mongoose = require('mongoose')
const common = require('../../config/common');
const config = common.config();
mongoose.connect(config.mongoURI);
const db = mongoose.connection;
const Product = require('../model/models');
const faker = require('faker');

module.exports = {
  seed: (res)=>{
    for (let i=1; i<11; i++){
      const p = new Product({
        name: faker.commerce.productName(),
        current_price: {
          value: faker.finance.amount(),
          currency_code: "USD"
          },
        });
      p.save((err, product)=> {
        if(err) return res.status(500).send(err);
        const response = {
          message: "Db seeded!"
        }
        return res.status(200).send(response)
      });
    }
  },
  drop: (res)=>{
    db.dropDatabase((err)=>{
      if(err) return res.status(500).send(err);
      const response = {
        message: "Db dropped"
      }
      return res.status(200).send(response)
    });
  },

  getProductById: (res, id) => {
    let p;
    Product.findById(id, (err, product) => {
      if (err) return res.status(404).send(err);
        p = product;
    return res.status(200).json(p)
  })
},

  postProduct: (res)=>{
    const p = new Product({
      name: faker.commerce.productName(),
      current_price: {
        value: faker.finance.amount(),
        currency_code: "USD"
        },
      });
    p.save();
    res.json(p);
  },

  getProduct: (res)=>{
    Product.find((err, product)=> {
      if (err) return res.status(500).send(err);
      res.json(product);
    })
  },

  deleteProduct: (res, id)=>{
    Product.findByIdAndRemove(id, (err, product)=>{
      if(err) return res.status(500).send(err);
    })
    return res.status(200).json({message: `Product ${id} was successfully removed.`})
  }


}
