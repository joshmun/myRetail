const express = require('express');
const mongoose = require('mongoose');
const common = require('./config/common');
const config = common.config();

mongoose.connect(config.mongoURI);

const app = express();

// routes
const products = require('./src/routes/products');

app.get('/', (req, res) => {
  res.send({json: 'data'});
});

app.use('/products', products);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

module.exports = server;
