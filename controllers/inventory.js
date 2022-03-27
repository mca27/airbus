const {
  validateAddProdductInfo,
} = require("../validation/inventory_validator");

const _ = require("lodash");
const productModel = require("../models/product");
const {
  STATUS_FALSE,
  INTERNAL_ERROR,
  STATUS_TRUE,
  PRODUCT_ADDED,
  PRODUCT_RETRIEVED,
  PRODUCTS_RETRIEVED,
  PRODUCT_NOT_FOUND,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
} = require("../constants/message_constants");
const { validateProductTitle } = require("../utils/common_util");

module.exports = {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns return all products which matches the filters
   */
  getAll: (req, res, next) => {
    // Get filter data from the query
    const { category, page, perPage } = _.get(req, "query", {});
    const query = {};

    // apply regex to filter products based on category
    if (category) {
      query.product_category = {
        $regex: category,
        $options: "xi"
      };
    }
    const paginateOptions = {};
    // set page and limit values
    if (page && perPage) {
      paginateOptions.page = page;
      paginateOptions.limit = perPage;
    }
    console.log("query", query);
    // Call the database with pagination object
    return (
      productModel
        .paginate(query, paginateOptions)
        .then((response) => {
          return res.status(200).send({
            status: STATUS_TRUE,
            code: 200,
            message: PRODUCTS_RETRIEVED,
            data: response,
          });
        })
        // Handle error if there are any
        .catch((error) => {
          if (error) {
            return res.status(500).send({
              status: STATUS_FALSE,
              code: 500,
              message: error.message || INTERNAL_ERROR,
            });
          }
        })
    );
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns single product whihc matches the product_id
   */
  getById: (req, res, next) => {
    // Extract product id from the params
    const { product_id } = _.get(req, "params", {});

    // Prepare the query
    const query = {
      product_id,
    };

    // Get the product by product id
    return productModel.findOne(query, (error, response) => {
      if (error) {
        return res.status(500).send({
          status: STATUS_FALSE,
          code: 500,
          message: error.message || INTERNAL_ERROR,
        });
      }
      // Check if the product is exists in the database
      if (response === null) {
        return res.status(404).send({
          status: STATUS_TRUE,
          code: 404,
          message: PRODUCT_NOT_FOUND,
          data: response,
        });
      }

      // return product with 200 status code
      return res.status(200).send({
        status: STATUS_TRUE,
        code: 200,
        message: PRODUCT_RETRIEVED,
        data: response,
      });
    });
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns the product details which has been created
   */
  create: async (req, res, next) => {
    // Validate product details before proceeding further.
    const result = validateAddProdductInfo(req.body);

    // If validation fails then return appropriate message
    if (result.error) {
      return res.status(400).send({
        code: 400,
        error: true,
        message: result.error.details[0].message,
        data: null,
      });
    }
    // Check if the product is already exists in the given category
    const { product_name, product_category } = _.get(req, "body", {});
    const productExists = await validateProductTitle(
      product_name,
      product_category
    );
    // If the product exists then return the conflict message with status code as 409
    if (productExists) {
      return res.status(409).send({
        code: 409,
        error: true,
        message: `Conflict: This Product ${product_name} already exists in the ${product_category} category`,
        data: null,
      });
    }

    // If everything looks good go ahead and create new peoduct
    return productModel.create(req.body, (error, response) => {
      if (error) {
        return res.status(500).send({
          status: STATUS_FALSE,
          code: 500,
          message: error.message || INTERNAL_ERROR,
        });
      } else {
        return res.status(200).send({
          status: STATUS_TRUE,
          code: 200,
          message: PRODUCT_ADDED,
          data: response,
        });
      }
    });
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns the updated product which matches the product id
   */
  update: (req, res, next) => {
    // Validate payload data before updating
    const result = validateAddProdductInfo(req.body);

    // If validation fails then return appropriate message
    if (result.error) {
      return res.status(400).send({
        code: 400,
        error: true,
        message: result.error.details[0].message,
        data: null,
      });
    }

    // Extract product_id from params
    const { product_id } = _.get(req, "params", {});
    const query = {
      product_id,
    };

    // Check if the product is exists which matches the product id
    return productModel.findOne(query, (error, response) => {
      if (error) {
        return res.status(500).send({
          status: STATUS_FALSE,
          code: 500,
          message: error.message || INTERNAL_ERROR,
        });
      }

      // if the product does not exists, then throw an error messge saying product not founc
      if (response === null || !response) {
        return res.status(404).send({
          status: STATUS_TRUE,
          code: 404,
          message: PRODUCT_NOT_FOUND,
          data: response,
        });
      }

      // If product exists, go ahead and update the product details
      if (response) {
        productModel.findOneAndUpdate(
          query,
          req.body,
          { new: true },
          (error, updateProduct) => {
            if (error) {
              return res.status(500).send({
                status: STATUS_FALSE,
                code: 500,
                message: error.message || INTERNAL_ERROR,
              });
            } else {
              return res.status(200).send({
                status: STATUS_TRUE,
                code: 200,
                message: PRODUCT_UPDATED,
                data: updateProduct,
              });
            }
          }
        );
      }
    });
  },

  delete: (req, res, next) => {
    // Extract product_id from params
    const { product_id } = _.get(req, "params", {});
    const query = {
      product_id,
    };

    // Check if the product is exists which matches the product id
    return productModel.findOne(query, (error, response) => {
      if (error) {
        return res.status(500).send({
          status: STATUS_FALSE,
          code: 500,
          message: error.message || INTERNAL_ERROR,
        });
      }

      // if the product does not exists, then throw an error messge saying product not founc
      if (response === null || !response) {
        return res.status(404).send({
          status: STATUS_TRUE,
          code: 404,
          message: PRODUCT_NOT_FOUND,
          data: response,
        });
      }

      // If product exists, go ahead and update the product details
      if (response) {
        productModel.findOneAndDelete(query, (error, deleteResp) => {
          if (error) {
            return res.status(500).send({
              status: STATUS_FALSE,
              code: 500,
              message: error.message || INTERNAL_ERROR,
            });
          } else {
            return res.status(200).send({
              status: STATUS_TRUE,
              code: 200,
              message: PRODUCT_DELETED,
              data: deleteResp,
            });
          }
        });
      }
    });
  },
};
