const collectionRoutes = require("../controllers/collection.controller");
const authM = require("../../middleware/authMiddleware");

const router = require("express").Router();

router.route("/").get(authM.protect, collectionRoutes.getAllCollections);

router.route("/all").get(authM.protect, collectionRoutes.getAllUserCollections);

router
  .route("/all/:id")
  .get(authM.protect, collectionRoutes.getAllCollectionsFromAnotherUser);

router.route("/clean/:id").get(authM.protect, collectionRoutes.getUnCollection);

router.route("/new").post(authM.protect, collectionRoutes.postCollection);

router
  .route("/delete/:id")
  .delete(authM.protect, collectionRoutes.deleteCollection);

router
  .route("/update/:id")
  .patch(authM.protect, collectionRoutes.updateCollection);

module.exports = router;
