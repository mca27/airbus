const uuid = require("uuid").v4;
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { USERS_COLLECTION } = require("../constants/collection_constants");

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  rawPassword: { type: String },
  phone: {
    type: String,
    trim: true,
  },
  token: {
    type: String,
    trim: true,
    default: null,
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
usersSchema.plugin(mongoosePaginate);
module.exports = mongoose.model(
  USERS_COLLECTION,
  usersSchema,
  USERS_COLLECTION
);
