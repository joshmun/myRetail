const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./config/common").config();
mongoose.connect(dbConnection);

const app = express();

// Route Resources
const products = require("./src/routes/products");

app.get("/status", (req, res) => {
  res.send({
    status: "OK",
    current_time: new Date().toLocaleString()
  });
});

app.use("/products", products);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

module.exports = server;
