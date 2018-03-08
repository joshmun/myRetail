const router = require('express').Router();
const ProductHelpers = require('../services/products');
const productHelper = new ProductHelpers();

// // GET all
// router.get('/', (req,res) => {
//   products.getProduct(res);
// });

//  GET /products/:id
router.get('/:id', (req,res) => {
  productHelper.getProductName(res, req.params.id)
  .then((productName)=>{
    return productHelper.getProductPrice(productName)
  })
  .then((productData)=>{
    res.json(productData)
  })
});

// PUT /products/:id
// Update pricing in local dropDatabase

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let queryPrice = req.query;
  queryPrice.value = Number(queryPrice.value)
  let updatedPrice = queryPrice
  productHelper.putProductPrice(id, updatedPrice)
  .then((updatedProduct)=>{
    res.status(200).json(updatedProduct);
    return productHelper.updateProductPrice(product)
  }, (error)=>{
    res.status(400).json(error);
  })
})

// // POST creates new product
// router.post('/', (req,res) => {
//   products.postProduct(res);
// });

// DELETE /products/:id
// router.delete('/:id', (req,res) => {
//   products.deleteProduct(res, req.params.id);
// });

module.exports = router;
