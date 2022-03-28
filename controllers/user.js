const { STATUS_TRUE, STATUS_FALSE, USER_FOUND } = require("../constants/message_constants");
const userModel = require("../models/user");
const authServices = require("../services/authServices");

module.exports = {
  userLogin: (req, res, next) => {
    const { email } = req.body;
    userModel.findOne({ email: email }, async (error, userInfo) => {
      if (error) {
        return res.send({
          status: "error",
          code: 400,
          message: err.message,
          data: null,
        });
      } else if (userInfo === null) {
        const { body } = req;
        body.phone = "9880935431"
        userModel.create(body, (error, userResp)=>{
          if(error){
            return res.send({
              status: "error",
              code: 400,
              message: err.message,
              data: null,
            });
          }else{
            generateAuthTokenByUserInfo(req, res, userInfo);
          }
        });
      } else {
        generateAuthTokenByUserInfo(req, res, userInfo)
      }
    });
  },
};

async function generateAuthTokenByUserInfo(req, res, userInfo) {
  const token = await authServices.createAuthToken(userInfo);
  if (token) {
    userInfo.token = token
    return res.status(200).send({
      status: STATUS_TRUE,
      code: 200,
      message: USER_FOUND,
      data: userInfo,
    });
  } else {
    return res.status(401).send({
      status: STATUS_FALSE,
      code: 401,
      message: "Unauthorized",
      data: null,
    });
  }
}
