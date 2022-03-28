const express = require("express");
const {
  GET_ALL_PRODUCTS,
  GET_SINGLE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GENRATE_TOKEN,
} = require("../constants/route_constants");
const router = express.Router();
const productController = require("../controllers/inventory");
const userController = require("../controllers/user");

router.get(GET_ALL_PRODUCTS, productController.getAll);
router.get(GET_SINGLE_PRODUCT, productController.getById);
router.post(ADD_PRODUCT, productController.create);
router.put(UPDATE_PRODUCT, productController.update);
router.delete(DELETE_PRODUCT, productController.delete);


router.post(GENRATE_TOKEN, userController.userLogin)

module.exports = router;
