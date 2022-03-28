const _ = require("lodash");
const authService = require("../services/authServices");

const auth = (req, res, next) => {
  console.log("req", req.path);
  if (req.path !== "/api/v1/user/login") {
    authService.validateToken(req, res, next);
  } else {
    return "ok"
  }
};

module.exports = {
  auth,
};
