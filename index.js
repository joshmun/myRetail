const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require('./config/common').config();
mongoose.connect(dbConnection);

const app = express();

// routes
const products = require("./src/routes/products");
const seed = require("./src/routes/seed");

app.get("/", (req, res) => {
  res.send({ json: "data" });
});

app.use("/products", products);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

module.exports = server;
