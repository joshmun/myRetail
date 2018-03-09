const router = require('express').Router();
const ProductHelpers = require('../services/products');
const productHelper = new ProductHelpers();

//  GET /products/:id
router.get('/:id', (req,res) => {
  productHelper.getProductName(res, req.params.id)
  .then((productName)=>{
    return productHelper.getProductPrice(productName, req.params.id)
  }, (error)=>{
    res.status(404).send(error);
  })
  .then((productData)=>{
    res.json(productData)
  }, (error)=>{
    res.status(404).send(error);
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
  }, (error)=>{
    res.status(404).json(error);
  })
})

module.exports = router;
