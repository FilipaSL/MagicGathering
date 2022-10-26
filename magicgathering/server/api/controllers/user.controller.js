const User = require("../models/user.model");
const Collection = require("../models/collection.model");
const Card = require("../models/card.model");
const { ObjectId } = require("mongodb");
const responseFormat = require("../utils/responseFormat");
const { verifyIsAdmin, userPassResponseFilter } = require("./helpers/helpers");
const {getAllCollectionsFromAnotherUser} = require("./collection.controller")

//Get all users
const getAllUsers = async (req, res) => {
  if (!req.user ||!verifyIsAdmin(res, req.user.admin)) {
    return;
  }
  await User.find()
    .then((allUsers) => {
      let userFilterPassword = allUsers.map((user)=> userPassResponseFilter(user)) 
      responseFormat.data = userFilterPassword;
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
      responseFormat.data = userPassResponseFilter(user);
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
    .then(async (resp) => {
      await Collection.find({ userId: searchId })
        .then(async (col) => {
          await Card.deleteMany({ collectionId: col._id })
          })
      await Collection.deleteMany({ userId: searchId })

      responseFormat.data = resp;
      responseFormat.message = "Success deleting User";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(404).json(responseFormat);
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
      if (!newUser) {
        responseFormat.data = null;
        responseFormat.message = "User not found";
        res.status(400).json(responseFormat);
        return;
      }
      responseFormat.data = userPassResponseFilter(newUser);
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
