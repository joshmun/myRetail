const express = require('express');
const mongoose = require('mongoose');
const common = require('./common');
const config = common.config();

mongoose.connect(config.mongoURI);

const app = express();

app.get('/', (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
