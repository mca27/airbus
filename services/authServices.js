
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const tokenCache = require("../middleware/tokenCache");
const authConfig = require("../config/auth");
const message = require("../utils/messages");

const decodeToken = (token) =>
  jwt.decode(token, authConfig.AUTHENTICATION_SALT);

const cacheResetKeyTimer = (key) => {
  tokenCache.cache.del(_.toString(key));
  tokenCache.cache.set(_.toString(key), _.toString(key));
};

module.exports = {
  createAuthToken: (data) =>
    new Promise((resolve, reject) => {
      const cacheExist = tokenCache.cache.get(_.toString(data._id));
      if (cacheExist == null || cacheExist === undefined) {
        tokenCache.cache.set(_.toString(data._id), _.toString(data._id));
      } else {
        tokenCache.cache.del(_.toString(data._id));
        tokenCache.cache.set(_.toString(data._id), _.toString(data._id));
      }
      resolve(
        jwt.sign({ _id: data._id }, authConfig.AUTHENTICATION_SALT, {
          expiresIn: authConfig.EXPIRES_IN,
        })
      );
    }),
  validateToken: (req, res, next) => {
    let token = req.header("authorization");
    if (token == null || token.length === 0)
      res.status(401).send(message.GENERIC_FAILURE_OBJ(401, "Invalid Token"));
    else {
      const decodedToken = decodeToken(token);
      console.log("decodedToken", decodedToken);
      if (
        decodedToken == null ||
        decodedToken === undefined ||
        decodedToken._id == null ||
        decodedToken._id === undefined
      )
        res.status(401).send(message.GENERIC_FAILURE_OBJ(401, "Invalid Token"));
      else {
        const key = decodedToken._id;
        const value = tokenCache.cache.get(key);
        if (value === undefined || value == null)
          res
            .status(401)
            .send(
              message.GENERIC_FAILURE_OBJ(
                401,
                "Token Expired. Please relogin !!!"
              )
            );
        else {
          console.log(`The Logged In User Id : ${decodedToken._id}`);
          cacheResetKeyTimer(key);
          return;
        }
      }
    }
  },
};
