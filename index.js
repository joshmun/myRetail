const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(ENV["mongoURI"]);

const app = express();

// routes
const products = require("./src/routes/products");
const seed = require("./src/routes/seed");

app.get("/", (req, res) => {
  res.send({ json: "data" });
});

app.use("/products", products);
app.use("/seed", seed);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

module.exports = server;
