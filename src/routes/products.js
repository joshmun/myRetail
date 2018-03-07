// Products route module

const express = require('express');
const router = express.Router();
const Product = require('../model/product-model');

router.get('/', function(req, res){
  res.send("Welcome to the products page");
});

router.get('/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if(!product){
      res.status(404)
      res.json({
        success: false,
        message: `Cannot find product with ID: ${req.params.id}`
      })
      res.end()
      return
    }
    res.send(product);
  });
})

module.exports = router;
