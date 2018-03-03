const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect();

const app = express();

app.get('/', (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);