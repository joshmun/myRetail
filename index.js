const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const env = process.env.NODE_ENV;

console.log(keys.mongoURI);
console.log(env);
console.log(keys.mongoURI[env]);

mongoose.connect(keys.mongoURI[env]);

const app = express();

app.get('/', (req, res) => {
  res.send("hello world");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT);
