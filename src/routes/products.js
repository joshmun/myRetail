// Products route module

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.send("Welcome to the products page");
});

router.get('/:id', (req, res) => {
  res.json({
    name: "Movie",
    current_price: {
      value: 5,
      currency: "USD"
    },
    createdAt: "March 5, 2018"
  });
})

module.exports = router;
