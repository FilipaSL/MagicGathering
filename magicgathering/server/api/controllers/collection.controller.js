const Collection = require("../models/collection.model");
const { ObjectId } = require("mongodb");
const responseFormat = require("../utils/responseFormat");
const { verifyIsAdmin, collectionFilter } = require("./helpers/helpers");

//Get all collections
const getAllCollections = async (req, res) => {
  if (!req.user || !verifyIsAdmin(res, req.user.admin)) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Only an admin can perform this operation"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
  }

  await Collection.find()
    .then((allColl) => {
      responseFormat.data = allColl;
      responseFormat.message = "";
      return res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(400).json(responseFormat);
    });
};

//Get one unnoficial collection
const getUnCollection = async (req, res) => {
  if (!req.user || !req.body) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Empty request"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
  }

  const id = req.user.id;
  const searchId = new ObjectId(id);
  //no need for verification because it only gets info from the logged user

  await Collection.findOne({ userId: searchId, official: 0 })
    .then((col) => {
      responseFormat.data = col;
      responseFormat.message = "";
      return res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(400).json(responseFormat);
    });
};

//All user collections
const getAllUserCollections = async (req, res) => {
  if (!req.user) {
    responseFormat.data = null;
    responseFormat.message = "Login to complete operation";

    return res.status(400).json(responseFormat);
  }
  const id = req.user.id;
  const searchId = new ObjectId(id);

  //no need for verification because it only gets info from the logged user

  await Collection.find({ userId: searchId })
    .then((col) => {
      responseFormat.data = col;
      responseFormat.message = null;
      return res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(400).json(responseFormat);
    });
};

const getAllCollectionsFromAnotherUser = async (req, res) => {
  if (!req.user || !verifyIsAdmin(res, req.user.admin)) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Only an admin can perform this operation"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
  }

  const id = req.params.id;
  const searchId = new ObjectId(id);

  await Collection.find({ userId: searchId })
    .then((col) => {
      responseFormat.data = col;
      responseFormat.message = "";
      return res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(400).json(responseFormat);
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
      responseFormat.message = null;
      return res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err.message;
      return res.status(400).json(responseFormat);
    });
};

//delete one collection
const deleteCollection = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);

  if (!req.user || !req.body) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Empty request"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
  }
  const filter = collectionFilter(searchId, req.user);

  await Collection.deleteOne(filter)
    .then((resp) => {
      responseFormat.data = resp;
      responseFormat.message = "";
      return res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(404).json(responseFormat);
    });
};

//Update one collection
const updateCollection = async (req, res) => {
  const id = req.params.id;
  if (!req.user || !req.body) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Empty request"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
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
        return res.status(404).json(responseFormat);
        return;
      } else {
        responseFormat.message = "";
        return res.status(200).json(responseFormat);
      }
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(400).json(responseFormat);
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
