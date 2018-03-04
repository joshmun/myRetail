const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const common = require('../../config/common');
const config = common.config();

mongoose.connect(config.mongoURI);

const ProductSchema = new Schema({
  name          : { type: String, required: true },
  current_price : {
    value         : { type: Number, required: true },
    currency_code : { type: String, required: true }
   }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
