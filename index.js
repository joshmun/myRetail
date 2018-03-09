const express = require("express");
const app = express();

const initializeDatabase = require('./src/dbs');
const routes = require('./src/routes');
let server;

initializeDatabase().then(dbs => {
  const PORT = process.env.PORT || 5000;
  routes(app, dbs).listen(PORT, (listening)=>{
    server = listening
  }).catch(err => {
    console.error('Failed to make database connection!')
    console.error(err)
    process.exit(1)
  })
})
// const mongoose = require("mongoose");
// const dbConnection = require("./config/common").config();
// mongoose.connect(dbConnection);



// Route Resources
const products = require("./src/routes/products");

app.get("/status", (req, res) => {
  res.send({
    status: "OK",
    current_time: new Date().toLocaleString()
  });
});

app.use("/products", products);

// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT);

module.exports = server;
