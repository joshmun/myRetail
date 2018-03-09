const Product = require('../model/product-model');
const ProductHelpers = require("../services/products");
const productHelper = new ProductHelpers();

// module.exports = {
//   product_get(req, res){
//     productHelper
//       .getProductName(res, req.params.id)
//       .then(
//         productName => {
//           return productHelper.getProductPrice(productName, req.params.id);
//         },
//         error => {
//           res.status(404).send(error);
//         }
//       )
//       .then(
//         productData => {
//           res.json(productData);
//         },
//         error => {
//           res.status(404).send(error);
//         }
//       );
//   },
//
//   product_update_put(req, res){
//     console.log("WE ARE IN THIS CHAIN")
//     let id = req.params.id;
//     let queryPrice = req.query;
//     queryPrice.value = Number(queryPrice.value);
//     let updatedPrice = queryPrice;
//     productHelper.updateProductPrice(id, updatedPrice.value).then(
//       updatedProduct => {
//         console.log('SUCCESS')
//         res.status(200).json(updatedProduct);
//       },
//       error => {
//         console.log('ERROR')
//         res.status(404).json(error);
//       }
//     );
//   }
// }
//
exports.product_get = (req, res)=>{
  productHelper
    .getProductName(res, req.params.id)
    .then(
      productName => {
        return productHelper.getProductPrice(productName, req.params.id);
      },
      error => {
        res.status(404).send(error);
      }
    )
    .then(
      productData => {
        res.json(productData);
      },
      error => {
        res.status(404).send(error);
      }
    );
}

exports.product_update_put = (req, res)=>{
  console.log("WE ARE IN THIS CHAIN")
  let id = req.params.id;
  let queryPrice = req.query;
  queryPrice.value = Number(queryPrice.value);
  let updatedPrice = queryPrice;
  productHelper.updateProductPrice(id, updatedPrice.value).then(
    updatedProduct => {
      console.log('SUCCESS')
      res.status(200).json(updatedProduct);
    },
    error => {
      console.log('ERROR')
      res.status(404).json(error);
    }
  );
}
