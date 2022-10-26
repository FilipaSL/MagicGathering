const cardsRoutes = require("../controllers/card.controller");
const authM = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").get(authM.protect, cardsRoutes.getAllCards);
router.route("/:id").get(authM.protect, cardsRoutes.getOneCard);
router
  .route("/collection/:id")
  .get(authM.protect, cardsRoutes.getCollectionCards);
router.route("/new").post(authM.protect, cardsRoutes.postCard);
router.route("/delete/:id").delete(authM.protect, cardsRoutes.deleteCard);
router.route("/update/:id").patch(authM.protect, cardsRoutes.updateCard);

module.exports = router;
