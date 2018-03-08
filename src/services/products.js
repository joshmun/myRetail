const mongoose = require('mongoose')
const common = require('../../config/common');
const config = common.config();
mongoose.connect(config.mongoURI);
const db = mongoose.connection;
const Product = require('../model/product-model');
const faker = require('faker');
const axios = require('axios');

class ProductHelpers{
    getProductName(res, id) {
      let productName;
      return new Promise(function(resolve, reject){
          axios.get(`http://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
          .then((response)=>{
            productName = response.data.product.item.product_description.title
            resolve({
              'product_id': id,
              'name': productName
            })
          })
        })
    }

    getProductPrice(productName){
      let productPrice;
      return new Promise(function(resolve, reject){
        Product.find({ 'product_id': productName.product_id }, (err, product) => {
          if (err) return err;
          productPrice = product[0];
          productName['current_price'] = productPrice.current_price;
          resolve(productName)
        });
      })
    }

    putProductPrice(id, updatedPrice){
      return new Promise(function(resolve, reject){
        Product.findOneAndUpdate({ 'product_id': id}, { 'current_price': updatedPrice }, (err, product) =>{
          if(err) {
            console.log(err)
            let message = {
              id: id,
              error: `Sorry, we could not find any product with id: ${id}.`
            }
            resolve(message);
          }
          else{
            let message = {
              id: id,
              message: `Successfully updated price to ${updatedPrice.value}`
            }
            resolve(message);
          }
        })
      })
      // let message;
      // let response = Product.findOneAndUpdate({ 'product_id': id}, { 'current_price': updatedPrice }, (err, product) =>{
      //   if(err) {
      //     console.log(err)
      //     message = {
      //       id: id,
      //       error: `Sorry, we could not find any product with id: ${id}.`
      //     }
      //     return message;
      //   }
      //   else{
      //     message = {
      //       id: id,
      //       message: `Successfully updated price to ${updatedPrice.value}`
      //     }
      //     console.log("hit this block")
      //   }
      //   console.log("ready to return?")
      //   console.log(message)
      //   return message
      // });
      // console.log(response)
      // return response;
    }
}

module.exports = ProductHelpers;

//
//   // postProduct: (res)=>{
//   //   const p = new Product({
//   //     product_id: faker.commerce.productName(),
//   //     current_price: {
//   //       value: faker.finance.amount(),
//   //       currency_code: "USD"
//   //       },
//   //     });
//   //   p.save();
//   //   res.status(201).json(p);
//   // },
//
//   getProduct: (res)=>{
//     Product.find((err, product)=> {
//       if (err) return res.status(500).send(err);
//       res.json(product);
//     })
//   },
//
//   deleteProduct: (res, id)=>{
//     Product.findByIdAndRemove(id, (err, product)=>{
//       if(err) return res.status(500).send(err);
//     })
//     return res.status(200).json({message: `Product ${id} was successfully removed.`})
//   }
// }
