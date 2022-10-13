const User = require("../models/user.model");
const router = require("express").Router();

router.route("/new").post((req, res) => {
  const newUser = new User(req.body);

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error! " + err));
});

//Get all users
router.route("/").get(async (req, res) => {
  const users = await User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.status(400).json("Error! " + err));
});

router.route("/delete/:id").delete();

router.route("/update/:id").put();

module.exports = router;
