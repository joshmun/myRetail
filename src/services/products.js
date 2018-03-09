const mongoose = require("mongoose");
const Product = require("../model/product-model");
const axios = require("axios");

class ProductHelpers {
  getProductName(res, id) {
    let productName;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`
        )
        .then(response => {
          productName = response.data.product.item.product_description.title;
          resolve({
            product_id: id,
            name: productName
          });
        })
        .catch(error => {
          reject({
            id: id,
            error: `Sorry, redsky did not respond with product data with this id.`
          });
        });
    });
  }

  getProductPrice(productName, id) {
    let productPrice;
    return new Promise((resolve, reject) => {
      Product.find({ product_id: productName.product_id }, (err, product) => {
        if (product.length < 1) {
          reject({
            id: id,
            error: "Sorry, we could not find this product."
          });
        } else {
          productPrice = product[0];
          productName["current_price"] = productPrice.current_price;
          resolve(productName);
        }
      });
    });
  }

  updateProductPrice(id, updatedPrice) {
    return new Promise(function(resolve, reject) {
      Product.find({ product_id: id }, (err, product) => {
        if (product.length < 1) {
          reject({
            id: id,
            error: "Sorry, we could not find this product."
          });
        } else {
          product = product[0];
          product.current_price.value = updatedPrice;
          product.save((err, updatedProduct) => {
            if (err) {
              reject({
                id: id,
                error: "Requested pricing update information was malformed."
              });
            }
            resolve({
              id: id,
              message: "Successfully updated!"
            });
          });
        }
      });
    });
  }
}

module.exports = ProductHelpers;
