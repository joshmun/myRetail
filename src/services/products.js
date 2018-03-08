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
            // console.log(response.data.product.item.product_description.title);
            productName = response.data.product.item.product_description.title
            resolve({
              'product_id': id,
              'name': productName
            })
          })
        })
      // getProductName(id, getProductPrice(id))
    }

    getProductPrice(productName){
      let productPrice;
      return new Promise(function(resolve, reject){
        Product.find({ 'product_id': productName.product_id }, (err, product) => {
          if (err) return err;
          productPrice = product[0];
          // console.log(productPrice)
          productName['current_price'] = productPrice.current_price;
          console.log(productName)
          resolve(productName)
        });
      })
    }

//     getProductName(id) {
//       let response;
//       axios.get(`http://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
//         .then((response)=>{
//           response = response.product.item.product_description.title
//         })
//       return response
//     }
//
//     getProductPrice(id) {
//       let productPrice;
//       Product.find({ 'product_id': id }, (err, product) => {
//           if (err) return err;
//           productPrice = product[0];
//         });
//       return productPrice
//     }
// }
//   getProductId: (res,id) => {
//
//
//
//
//
//
//
// class ProductHelpers {
//   getProductById(res, id){
//
//     let productName;
//     let productPrice;
//     let completed = false;
//     let response;
//
//     axios.get(`http://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
//       .then((response)=>{
//         productName = response.product.item.product_description.title;
//         this.check(completed, res);
//       })
//
//     Product.find({ 'product_id': id }, (err, product) => {
//         if (err) return err;
//         productPrice = product[0];
//         this.check(completed, res)
//       });
//
//     // function check() {
//     //   if(!completed){
//     //     completed = true;
//     //     return completed;
//     //   }
//     //   else{
//     //     response = new Product({
//     //       product_id: id,
//     //       name: productName,
//     //       current_price: productPrice
//     //     });
//     //   }
//     //   console.log("HEYHEYEHEY")
//     //   console.log(response)
//     //   return response;
//     // }
//
//       // let error = response.validateSync()
//       // if(error){
//       //   console.log(error)
//       //   res.status(404).send(error)
//       // }
//       // return res.status(200).json(response)
//
//     // const product = this.findById(id);
//     // const productPrice = product.current_price;
//     // const productPrice = async function getProductPrice(id){
//     //   await this.findById(id).current_price;
//     // }();
//     // console.log(productPrice);
//     // // redskyProduct =
//     // const productName = async function redskyProduct(id){
//     //   await this.getRedsky(id)
//       // await ()=>{
//       //   new Product({
//       //   product_id: id,
//       //   name: productName,
//       //   current_price: productPrice
//       // })
//     //   // }
//     // }();
//     // console.log(redskyProduct);
//     // const productName = this.parseName(redskyProduct);
//
//   }
//
//   getRedsky(id){
//     return axios.get(`http://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
//       .then((response)=>{
//         return response.product.item.product_description.title;
//       })
//       .catch((err)=>{
//         return err.response.status
//       });
//   }
//
//   parseName(response){
//     console.log(response.product)
//     return response.product.item.product_description.title;
//   }
//
//   findById(id){
//     return Product.find({ 'product_id': id }, (err, product) => {
//       if (err) return err;
//       return product[0];
//     });
//   }
}

module.exports = ProductHelpers;

// module.exports = {
//   // getProductById: (res, id) => {
//   //   console.log("here we are")
//   //   const product = findById(id);
//   //   const productPrice = product.current_price;
//   //   const redskyProduct = getRedsky(id);
//   //   const productName = parseName(redskyProduct);
//   //   const response = new Product({
//   //     product_id: id,
//   //     name: productName,
//   //     current_price: productPrice
//   //   });
//   //   console.log("hit this route")
//   //   let error = response.validateSync()
//   //   if(error){
//   //     console.log(error)
//   //     console.log("hello!")
//   //     res.status(404).send(error)
//   //   }
//   //   return res.status(200).json(response)
//   // },
//   //
//   // getRedsky: (id) => {
//   //   axios.get(`http://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
//   //     .then((response)=>{
//   //       return response;
//   //     })
//   //     .catch((err)=>{
//   //       return err.response.status
//   //     });
//   // },
//   //
//   // parseName: (response)=>{
//   //   return response.product.item.product_description.title;
//   // },
//   //
//   // findById: (id) => {
//   //   Product.findOne({ 'product_id': id }, (err, product) => {
//   //     if (err) return err;
//   //     return product;
//   //   });
//   // },
//
//
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
