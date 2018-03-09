const Product = require("../model/product-model");
const ProductHelpers = require("../services/products");
const productHelper = new ProductHelpers();

exports.product_get = (req, res) => {
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
};

exports.product_update_put = (req, res) => {
  let id = req.params.id;
  let queryPrice = req.query;
  queryPrice.value = Number(queryPrice.value);
  let updatedPrice = queryPrice;
  productHelper.updateProductPrice(id, updatedPrice.value).then(
    updatedProduct => {
      res.status(200).json(updatedProduct);
    },
    error => {
      res.status(404).json(error);
    }
  );
};
