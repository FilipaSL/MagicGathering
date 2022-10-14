const userRoutes = require("../controllers/user.controller");
const authM = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").get(authM.protect, userRoutes.getAllUsers);
router.route("/login").post(userRoutes.loginUser);
router.route("/new").post(authM.protect, userRoutes.postUser);
router.route("/delete/:id").delete(authM.protect, userRoutes.deleteUser);
router.route("/update/:id").put(authM.protect, userRoutes.updateUser);
router.route("/register").post(authM.protect, userRoutes.registerUser);

module.exports = router;
