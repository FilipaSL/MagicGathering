const cardsRoutes = require("../controllers/card.controller");
const authM = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").get(authM.protect, cardsRoutes.getAllCards);
router.route("/:id").get(authM.protect, cardsRoutes.getOneCard);
router.route("/new").post(authM.protect, cardsRoutes.postCard);
router.route("/delete/:id").delete(authM.protect, cardsRoutes.deleteCard);
router.route("/update/:id").put(authM.protect, cardsRoutes.updateCard);

module.exports = router;
