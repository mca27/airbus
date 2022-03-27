const uuid = require("uuid").v4;
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { PRODUCT_COLLECTION } = require("../constants/collection_constants");

const { Schema } = mongoose;

const productSchema = new Schema({
  product_id: {
    type: String,
    default: function genUUID() {
      return uuid();
    },
  },
  product_name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  product_category: {
    type: String,
    trim: true,
  },
  product_description: {
    type: String,
    trim: true,
  },
  units: {
    type: Number,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model(PRODUCT_COLLECTION, productSchema, PRODUCT_COLLECTION);
