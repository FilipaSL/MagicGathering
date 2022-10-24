const User = require("../models/user.model");
const { ObjectId } = require("mongodb");
const responseFormat = require("../utils/responseFormat");
const { verifyIsAdmin } = require("./helpers/helpers");

//Get all users
const getAllUsers = async (req, res) => {
  if (!req.user ||!verifyIsAdmin(res, req.user.admin)) {
    return;
  }
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
  if (!req.user || !verifyIsAdmin(res, req.user.admin)) {
    return;
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

//Delete one User
const deleteUser = async (req, res) => {
  if (!req.user ||!verifyIsAdmin(res, req.user.admin)) {
    return;
  }
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
  if (!req.user ||!verifyIsAdmin(res, req.user.admin)) {
    return;
  }
  const id = req.params.id;
  const body = req.body;
  const searchId = new ObjectId(id);
  await User.findByIdAndUpdate(searchId, body, { new: true })
    .then((newUser) => {
      responseFormat.data = newUser;

      if (!newUser) {
        responseFormat.data = null;
        responseFormat.message = "User not found";
        res.status(400).json(responseFormat);
      }
      responseFormat.message = "";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

module.exports = {
  getAllUsers,
  postUser,
  deleteUser,
  updateUser,
};
