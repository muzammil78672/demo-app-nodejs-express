const { compareSync } = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const db = require("../models");

module.exports = {
  createUser: async (userObj) => {
    try {
      return await db.user.create(userObj);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  getUser: async (whereObj) => {
    try {
      return await db.user.findOne(whereObj);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  authenticate: async (userObj, password, tokenExpiry = process.env.JWT_EXPIRY) => {
    try {
      if (compareSync(password, userObj.password)) {
        const token = jwt.sign({ userId: userObj.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: tokenExpiry,
        });
        return token;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  },
};
