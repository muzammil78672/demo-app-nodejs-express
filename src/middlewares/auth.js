const jwt = require("jsonwebtoken");

const Services = require("../services");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

module.exports.verify = (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ");
    }
    if (token) {
      jwt.verify(token[1], JWT_SECRET, async (err, payload) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            return res
              .status(401)
              .send({ status: 401, message: "Token expired", data: {} });
          }
          next(err);
        }
        if (payload && payload.hasOwnProperty("userId")) {
          let user = await Services.user.getUser({
            id: payload.userId,
          });
          if (user) {
            user = user.toJSON();
            delete user.password;
            req.user = user;
            next();
          } else {
            return res
              .status(401)
              .send({ status: 401, message: "Invalid token", data: {} });
          }
        } else {
          return res
            .status(401)
            .send({ status: 401, message: "Invalid token", data: {} });
        }
      });
    } else {
      return res
        .status(401)
        .send({ status: 401, message: "Invalid token", data: {} });
    }
  } catch (error) {
    next(error);
  }
};
