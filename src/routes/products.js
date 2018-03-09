const router = require("express").Router();
// const ProductHelpers = require("../services/products");
// const productHelper = new ProductHelpers();

const product_controller = require('../controllers/products-controller');

//  GET /products/:id
router.get("/:id", product_controller.product_get);

// router.get("/:id", (req, res) => {
//   productHelper
//     .getProductName(res, req.params.id)
//     .then(
//       productName => {
//         return productHelper.getProductPrice(productName, req.params.id);
//       },
//       error => {
//         res.status(404).send(error);
//       }
//     )
//     .then(
//       productData => {
//         res.json(productData);
//       },
//       error => {
//         res.status(404).send(error);
//       }
//     );
// });

// PUT /products/:id
router.put("/:id", product_controller.product_update_put);
// product_controller.product_update_put);

// router.put("/:id", (req, res) => {
//   let id = req.params.id;
//   let queryPrice = req.query;
//   queryPrice.value = Number(queryPrice.value);
//   let updatedPrice = queryPrice;
//   productHelper.updateProductPrice(id, updatedPrice.value).then(
//     updatedProduct => {
//       res.status(200).json(updatedProduct);
//     },
//     error => {
//       res.status(404).json(error);
//     }
//   );
// });

module.exports = router;
