const Controllers = require("../controllers");
const { verify } = require("../middlewares/auth");

module.exports = (router) => {
  router.post("/register", Controllers.user.register);
  router.post("/login", Controllers.user.login);
  router.get("/profile", verify, Controllers.user.getProfile);
};
