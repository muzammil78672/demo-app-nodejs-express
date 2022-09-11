const Services = require("../services");
const Validations = require("../validations");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { error, value } = Validations.user.createUser(req.body);
      if (error) {
        return res
          .status(400)
          .send({ status: 400, message: error.details[0].message, data: {} });
      }

      const isUserExist = await Services.user.getUser(
        {
          email: value.email,
        },
        true
      );

      if (isUserExist) {
        return res.status(400).send({
          status: 400,
          message: "User already exist with this email",
          data: {},
        });
      }

      const user = await Services.user.createUser(value);

      delete user.password;

      res.status(201).send({
        status: 201,
        message: "user created successfully",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { error, value } = Validations.user.loginUser(req.body);
      if (error) {
        return res
          .status(400)
          .send({ status: 400, message: error.details[0].message });
      }
      const { email, password } = value;
      const user = await Services.user.getUser({ email });
      if (!user) {
        return res.status(401).send({
          status: 401,
          message: "Invalid username or password",
          data: {},
        });
      }
      const token = await Services.user.authenticate(user, password);
      if (token) {
        return res.status(200).send({
          status: 200,
          message: "login successful",
          data: { token },
        });
      }

      res.status(401).send({
        status: 401,
        message: "Invalid username or password",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  },
  getProfile: async (req, res, next) => {
    try {
      res.status(200).send({
        status: 200,
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
};
