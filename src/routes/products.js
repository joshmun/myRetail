// Products route module

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.send("Welcome to the products page");
});

router.get('/:id', (req, res) => {
  res.send("waddup");
})

module.exports = router;
