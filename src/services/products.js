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
          .catch((error)=>{
            reject({
              id: id,
              error: `Sorry, redsky didn't respond with product data with this id.`
            })
          })
        })
    }

    getProductPrice(productName, id){
      let productPrice;
      return new Promise(function(resolve, reject){
        Product.find({ 'product_id': productName.product_id }, (err, product) => {
          if (product.length < 1){
            reject(
              {
                id: id,
                error: 'Sorry, we could not find this product.'
              })
          }
          else {
          productPrice = product[0];
          productName['current_price'] = productPrice.current_price;
          resolve(productName)
          }
        });
      })
    }

    putProductPrice(id, updatedPrice){
      return new Promise(function(resolve, reject){
        Product.find({ product_id: id}, (err, product)=>{
          if (product.length < 1){
            reject(Error(
              {
                  id: id,
                  error: 'Sorry, we could not find this product.'
              })
            )
          }
          else{
            product = product[0];
            product.current_price = updatedPrice;
            product.save((err, updatedProduct)=>{
              // resolve(updatedProduct);
              resolve({
                id: updatedProduct.product_id,
                message: "Succesfully updated!"
              })
            })
          }
        })
        // Product.findOneAndUpdate({ product_id: id}, {$set: {current_price: updatedPrice }}, (err, product) =>{
        //   if(err) {
        //     console.log(err)
        //     let message = {
        //       id: id,
        //       error: `Sorry, we could not find any product with id: ${id}.`
        //     }
        //     resolve(message);
        //   }
        //   else{
        //     let message = {
        //       id: id,
        //       message: `Successfully updated price to ${updatedPrice.value}`
        //     }
        //     resolve(message);
        //   }
        // })
      })
    }

    // updateProductPrice(product, updatedPrice){
    //   console.log(updatedPrice)
    //   return new Promise((resolve, reject) => {
    //     product.update({current_price: updatedPrice }, (err, product)=>{
    //       if(err){
    //         resolve(err)
    //       }
    //       else {
    //         resolve(
    //           {
    //             message: `Successfully updated price to ${updatedPrice.value}`
    //           }
    //         )
    //       }
    //     })
    //   })
    // }
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
