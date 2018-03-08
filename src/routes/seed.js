// Seed db route module

const express = require('express');
const router = express.Router();
const seed = require('../db/seed');
const Product = require('../model/product-model');

router.get('/', (req, res) => {
  seed.seed(res);
});

router.get('/drop', (req, res) => {
  seed.drop(res);
});

router.get('/one', (req, res)=>{
  seed.seedOne(res);
})

// // GET all
// router.get('/product', (req,res) => {
//   seed.getProduct(res);
// });
//
// //  GET /product/{id}
// router.get('/product/:id', (req,res) => {
//   seed.getProductById(res, req.params.id);
// });
//
// // POST creates new product
// router.post('/product', (req,res) => {
//   seed.postProduct(res);
// });
//
// // DELETE product at id
// router.delete('/product/:id', (req,res) => {
//   seed.deleteProduct(res, req.params.id);
// });

module.exports = router;
