const Collection = require("../models/collection.model");
const { ObjectId } = require("mongodb");
const responseFormat = require("../utils/responseFormat");

//Get all collections
const getAllCollections = async (req, res) => {
  await Collection.find()
    .then((allColl) => {
      responseFormat.data = allColl;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Get one unnoficial collection
const getUnCollection = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);

  await Collection.findOne({ userId: searchId, official: 0 })
    .then((col) => {
      responseFormat.data = col;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//All user collections
const getAllUserCollections = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);

  await Collection.find({ userId: searchId })
    .then((col) => {
      responseFormat.data = col;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Create new Collection
const postCollection = (req, res) => {
  const newCollection = new Collection(req.body);
  newCollection
    .save()
    .then((col) => {
      responseFormat.data = col;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//delete one collection
const deleteCollection = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  await Collection.deleteOne({ _id: searchId })
    .then((resp) => {
      responseFormat.data = resp;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Update one collection
const updateCollection = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const searchId = new ObjectId(id);
  await Collection.findByIdAndUpdate(searchId, body, { new: true })
    .then((resp) => {
      responseFormat.data = resp;

      if (!resp) {
        responseFormat.message = "Collection not found.";
        res.status(404).json(responseFormat);
      }
      responseFormat.data = resp;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

module.exports = {
  getAllCollections,
  getUnCollection,
  getAllUserCollections,
  postCollection,
  deleteCollection,
  updateCollection,
};
