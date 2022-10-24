const loginRoutes = require("../controllers/login.controller");
const router = require("express").Router();

router.route("/").post(loginRoutes.loginUser);
router.route("/register").post(loginRoutes.registerUser);
//router.route("/new").post(loginRoutes.postUser);

module.exports = router;
