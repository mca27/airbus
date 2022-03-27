const Joi = require("joi");

const addProduct = Joi.object({
  product_name: Joi.string().required(),
  product_category: Joi.string().required(),
  product_description: Joi.string().required(),
  units: Joi.number().required(),
});

const validateAddProdductInfo = (data) => {
  const schema = addProduct;
  return schema.validate(data);
};

module.exports = {
  validateAddProdductInfo,
};
