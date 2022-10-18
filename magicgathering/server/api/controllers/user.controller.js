const User = require("../models/user.model");
const { ObjectId } = require("mongodb");
const generateToken = require("../utils/generateToken.js");
const responseFormat = require("../utils/responseFormat");

//Get all users
const getAllUsers = async (req, res) => {
  await User.find()
    .then((allUsers) => {
      responseFormat.data = allUsers;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Create a new User
const postUser = (req, res) => {
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

//Delete one User
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  await User.deleteOne({ _id: searchId })
    .then((resp) => {
      responseFormat.data = resp;
      responseFormat.message = "Success deleting User";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Update one User
const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const searchId = new ObjectId(id);
  await User.findByIdAndUpdate(searchId, body, { new: true })
    .then((newUser) => {
      responseFormat.data = newUser;

      if (!newUser) {
        responseFormat.message = "User not found";
        res.status(400).json(responseFormat);
      }
      responseFormat.message = err;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Login User
const loginUser = async (req, res) => {
  const { userName } = req.body;

  const user = await User.findOne({ userName });

  //if (user && (await user.matchPassword(password))) {
  if (user) {
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
  }
};

const registerUser = async (req, res) => {
  const { userName, password, realName } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    responseFormat.data = null;
    responseFormat.message = "User already exists";
    res.status(404).json(responseFormat);
  }

  const user = await User.create({
    userName,
    password,
    realName,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      admin: 0,
      realName: user.realName,
      token: generateToken.generateToken(user._id),
    });
  } else {
    responseFormat.data = null;
    responseFormat.message = "User not found";
    res.status(400).json(responseFormat);
  }
};

module.exports = {
  getAllUsers,
  postUser,
  deleteUser,
  updateUser,
  loginUser,
  registerUser,
};
