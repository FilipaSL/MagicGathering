const Card = require("../models/card.model");
const Collection = require("../models/collection.model");

const router = require("express").Router();

//Get all collections
const getAllCollections = async (req, res) => {
  await Collection.find()
    .then((allColl) => res.json(allColl))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Get one unnoficial collection
const getUnCollection = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectID(id);

  await Collection.findOne({ userId: searchId, official: 0 })
    .then((col) => res.json(col))
    .catch((err) => res.status(404).json("Error! " + err));
};

//All user collections
const getAllUserCollections = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectID(id);

  await Collection.find({ userId: searchId })
    .then((col) => res.json(col))
    .catch((err) => res.status(404).json("Error! " + err));
};

//Create new Collection
const postCollection = (req, res) => {
  const newCollection = new Collection(req.body);
  newCollection
    .save()
    .then((col) => res.json(col))
    .catch((err) => res.status(400).json("Error! " + err));
};

//delete one collection
const deleteCollection = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectID(id);
  await Collection.deleteOne({ _id: searchId })
    .then(() => res.status(300).json("Success deleting"))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Update one collection
const updateCollection = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const searchId = new ObjectID(id);
  await Collection.findByIdAndUpdate(searchId, body)
    .then(() => res.status(300).json("Success updating"))
    .catch((err) => res.status(400).json("Error! " + err));
};

module.exports = {
  getAllCollections,
  getUnCollection,
  getAllUserCollections,
  postCollection,
  deleteCollection,
  updateCollection,
};
