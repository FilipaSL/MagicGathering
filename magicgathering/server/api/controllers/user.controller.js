const User = require("../models/user.model");
const { ObjectId } = require('mongodb');
const generateToken = require("../utils/generateToken.js");

//Get all users
const getAllUsers = async (req, res) => {
  await User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Create a new User
const postUser = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Delete one User
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  await User.deleteOne({ _id: searchId })
    .then(() => res.status(300).json("Success deleting"))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Update one User
const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const searchId = new ObjectId(id);
  await User.findByIdAndUpdate(searchId, body)
    .then(() => res.status(300).json("Success updating"))
    .catch((err) => res.status(400).json("Error! " + err));
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
    res.status(401);
    res.status(401).json("Invalid Username or Password! ");
  }
};

const registerUser = async (req, res) => {
  const { userName, password, realName, admin } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(404).json("User already exists");
  }

  const user = await User.create({
    admin,
    userName,
    password,
    realName,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      admin: user.admin,
      realName: user.realName,
      token: generateToken.generateToken(user._id),
    });
  } else {
    res.status(400).json("User not found");
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
