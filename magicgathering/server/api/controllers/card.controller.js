const Card = require("../models/card.model");
const responseFormat = require("../utils/responseFormat");
const { ObjectId } = require("mongodb");
const {
  verifyCardRequestUser,
  verifyIsAdmin,
  verifyCardBodyValues,
} = require("./helpers/helpers");

//Get all cards
const getAllCards = async (req, res) => {
  if (!req.user || !verifyIsAdmin(res, req.user.admin)) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Only an admin can perform this operation"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
  }

  await Card.find()
    .then((allCards) => {
      responseFormat.data = allCards;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Get one card
const getOneCard = async (req, res) => {
  if (!req.user || !verifyIsAdmin(res, req.user.admin)) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Only an admin can perform this operation"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
  }

  const id = req.params.id;
  const searchId = new ObjectId(id);

  await Card.findById(searchId)
    .then((card) => {
      responseFormat.data = card;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Get collection Cards
const getCollectionCards = async (req, res) => {
  const searchId = req.params.id;
  if (!req.user || !req.body) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Empty request"
      : "Login to complete operation";
    return res.status(400).json(responseFormat);
  }
  const allowed = await verifyCardRequestUser(req.user, searchId);
  if (!allowed) {
    responseFormat.data = null;
    responseFormat.message =
      "User doesn't have permission to make this alteration.";

    return res.status(400).json(responseFormat);
  }
  await Card.find({ collectionId: searchId })
    .then((cards) => {
      responseFormat.data = cards;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Create new Card
const postCard = async (req, res) => {
  if (!req.user || !req.body) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Empty request"
      : "Login to complete operation";

    return res.status(400).json(responseFormat);
  }

  const allowed = await verifyCardRequestUser(req.user, req.body.collectionId);

  if (!allowed) {
    responseFormat.data = null;
    responseFormat.message =
      "User does not have permission to make this alteration.";

    return res.status(400).json(responseFormat);
  }

  const newCard = new Card(req.body);

  newCard
    .save()
    .then((card) => {
      responseFormat.data = card;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err.message;
      res.status(400).json(responseFormat);
    });
};

//Delete one card
const deleteCard = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);

  if (!req.user || !req.body) {
    responseFormat.data = null;
    responseFormat.message = req.user
      ? "Empty request"
      : "Login to complete operation";
    return res.status(400).json(responseFormat);
  }

  await Card.deleteOne({ _id: searchId })
    .then((ans) => {
      if (ans.deletedCount === 0) {
        responseFormat.data = null;
        responseFormat.message = "Nothing to delete";
        return res.status(400).json(responseFormat);
      } else {
        responseFormat.message = "Success deleting";
        return res.status(200).json(responseFormat);
      }
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(404).json(responseFormat);
    });
};

//Update one card
const updateCard = async (req, res) => {
  if (
    !req.user ||
    !req.body ||
    (!req.body.collectionId && !verifyCardBodyValues(req.body))
  ) {
    responseFormat.data = null;
    responseFormat.message = "Cannot send empty values";
    return res.status(400).json(responseFormat);
  }

  const id = req.params.id;
  const body = req.body;
  const searchId = new ObjectId(id);
  const allowed = await verifyCardRequestUser(req.user, req.body.collectionId);

  if (!allowed) {
    responseFormat.data = null;
    responseFormat.message =
      "User doesn't have permission to make this alteration.";

    return res.status(400).json(responseFormat);
  }

  await Card.findByIdAndUpdate(searchId, body, { new: true })
    .then((newCard) => {
      responseFormat.data = newCard;

      if (!newCard) {
        responseFormat.message = "Card not found.";
        return res.status(404).json(responseFormat);
        return;
      }
      responseFormat.data = newCard;
      responseFormat.message = "Success updating";
      return res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.data = null;
      responseFormat.message = err;
      return res.status(400).json(responseFormat);
    });
};

module.exports = {
  getAllCards,
  getOneCard,
  getCollectionCards,
  postCard,
  deleteCard,
  updateCard,
};
