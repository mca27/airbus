const productModel = require("../models/product");
const validateProductTitle = async (product_name, product_category) => {
  return await productModel.findOne({ product_name, product_category });
};
module.exports = {
    validateProductTitle,
};
