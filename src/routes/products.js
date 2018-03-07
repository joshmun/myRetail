const router = require('express').Router();
const products = require('../services/products');

// GET all
router.get('/', (req,res) => {
  products.getProduct(res);
});

//  GET /products/:id
router.get('/:id', (req,res) => {
  products.getProductById(res, req.params.id);
});

// POST creates new product
router.post('/', (req,res) => {
  products.postProduct(res);
});

// DELETE /products/:id
router.delete('/:id', (req,res) => {
  products.deleteProduct(res, req.params.id);
});

module.exports = router;
