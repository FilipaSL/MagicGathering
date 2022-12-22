const generateToken = require("../utils/generateToken.js");
const User = require("../models/user.model");
const Collection = require("../models/collection.model");

const responseFormat = require("../utils/responseFormat");

//Login User
const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      realName: user.realName,
      admin: user.admin,
      token: generateToken.generateToken(user._id),
    });
  } else {
    responseFormat.data = null;
    responseFormat.message = "Invalid Username or Password!";
    res.status(401).json(responseFormat);
    return;
  }
};

const registerUser = async (req, res) => {
  const { userName, password, realName } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    responseFormat.data = null;
    responseFormat.message = "User already exists";
    res.status(400).json(responseFormat);
  } else {
    const user = await User.create({
      userName,
      password,
      realName,
      admin: 0,
    });

    if (user) {
      const collectionBody = {
        userId: user._id,
        official: 0,
        colName: user.realName,
      };

      const newCollection = new Collection(collectionBody);
      newCollection.save();

      responseFormat.data = {
        _id: user._id,
        userName: user.userName,
        admin: 0,
        realName: user.realName,
        token: generateToken.generateToken(user._id),
      };
      res.status(201).json(responseFormat);
    } else {
      responseFormat.data = null;
      responseFormat.message = "User not found";
      res.status(400).json(responseFormat);
    }
  }
};
//Create a new User
const postUser = (req, res) => {
  if (!verifyIsAdmin(res, req.user.admin)) {
    responseFormat.data = null;
    responseFormat.message = "Only an admin can perform this operation";

    return res.status(400).json(responseFormat);
  }

  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => {
      responseFormat.data = user;
      responseFormat.message = "Success creating new User";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

module.exports = {
  loginUser,
  registerUser,
  postUser,
};
