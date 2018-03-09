const mongoose = require("mongoose");
const dbConnection = require("../../config/common").config();
// mongoose.connect(dbConnection);

function connect(){
  return mongoose.connect(dbConnection)
}

module.exports = async function() {
  let database = await Promise(connect())
  return {
    db: database
  }
}
