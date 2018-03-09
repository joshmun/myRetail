const router = require("express").Router();

// Product Resources
const product_controller = require('../controllers/products-controller');

//  GET /products/:id
router.get("/:id", product_controller.product_get);

// PUT /products/:id
router.put("/:id", product_controller.product_update_put);

module.exports = router;
