const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const common = require('../../config/common');
const config = common.config();

mongoose.connect(config.mongoURI);

const ProductSchema = new Schema({
  _id: { type: Number },
  name          : { type: String, required: true },
  current_price : {
    value         : { type: Number, required: true },
    currency_code : { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
});

ProductSchema.pre('save', next => {
  let now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
