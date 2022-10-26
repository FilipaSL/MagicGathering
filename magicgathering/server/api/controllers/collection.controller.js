const Collection = require("../models/collection.model");
const { ObjectId } = require("mongodb");
const responseFormat = require("../utils/responseFormat");
const { verifyIsAdmin, collectionFilter } = require("./helpers/helpers");

//Get all collections
const getAllCollections = async (req, res) => {
  if (!req.user || !verifyIsAdmin(res, req.user.admin)) {
    return;
  }
  await Collection.find()
    .then((allColl) => {
      responseFormat.data = allColl;
      responseFormat.message = "";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Get one unnoficial collection
const getUnCollection = async (req, res) => {
  if (!req.user || !req.body) {
    return;
  }
  const id = req.user.id;
  const searchId = new ObjectId(id);
  //no need for verification because it only gets info from the logged user

  await Collection.findOne({ userId: searchId, official: 0 })
    .then((col) => {
      responseFormat.data = col;
      responseFormat.message = "";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//All user collections
const getAllUserCollections = async (req, res) => {
  if (!req.user) {
    return;
  }
  const id = req.user.id;
  const searchId = new ObjectId(id);

  //no need for verification because it only gets info from the logged user

  await Collection.find({ userId: searchId })
    .then((col) => {
      responseFormat.data = col;
      responseFormat.message = "";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

const getAllCollectionsFromAnotherUser = async (req, res) => {
  if (!req.user || !verifyIsAdmin(res, req.user.admin)) {
    return;
  }
  const id = req.params.id;
  const searchId = new ObjectId(id);

  await Collection.find({ userId: searchId })
    .then((col) => {
      responseFormat.data = col;
      responseFormat.message = "";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Create new Collection
const postCollection = (req, res) => {
  const bodyWithUser = {
    ...req.body,
    userId: req.user._id,
  };
  const newCollection = new Collection(bodyWithUser);
  newCollection
    .save()
    .then((col) => {
      responseFormat.data = col;
      responseFormat.message = "";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err.message;
      res.status(400).json(responseFormat);
    });
};

//delete one collection
const deleteCollection = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  if (!req.user || !req.body) {
    return;
  }
  const filter = collectionFilter(searchId, req.user);

  await Collection.deleteOne(filter)
    .then((resp) => {
      responseFormat.data = resp;
      responseFormat.message = "";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(404).json(responseFormat);
    });
};

//Update one collection
const updateCollection = async (req, res) => {
  const id = req.params.id;
  if (!req.user || !req.body) {
    return;
  }
  const body = req.body;
  const searchId = new ObjectId(id);
  const filter = collectionFilter(searchId, req.user);
  await Collection.findOneAndUpdate(filter, body, { new: true })
    .then((resp) => {
      responseFormat.data = resp;

      if (!resp) {
        responseFormat.data = null;
        responseFormat.message = "Collection not found.";
        res.status(404).json(responseFormat);
        return;
      } else {
        responseFormat.message = "";
        res.status(200).json(responseFormat);
      }
    })
    .catch((err) => {
      responseFormat.data = null;
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
  getAllCollectionsFromAnotherUser,
};
