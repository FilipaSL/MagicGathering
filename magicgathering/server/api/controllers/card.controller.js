const Card = require("../models/card.model");
const responseFormat = require("../utils/responseFormat");
const { ObjectId } = require("mongodb");
const { verifyCardRequestUser, verifyIsAdmin } = require("./helpers/helpers");

//Get all cards
const getAllCards = async (req, res) => {
  if (!verifyIsAdmin(res, req.user._id)) {
    return;
  }
  await Card.find()
    .then((allCards) => {
      responseFormat.data = allCards;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Get one card
const getOneCard = async (req, res) => {
  if (!verifyIsAdmin(res, req.user._id)) {
    return;
  }
  const id = req.params.id;
  const searchId = new ObjectId(id);
  await Card.findById(searchId)
    .then((card) => {
      responseFormat.data = card;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Get collection Cards
const getCollectionCards = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  if (!verifyCardRequestUser(res, req.user._id, searchId)) {
    return;
  }
  await Card.find({ collectionId: searchId })
    .then((cards) => {
      responseFormat.data = cards;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Create new Card
const postCard = (req, res) => {
  if (!verifyCardRequestUser(res, req.user._id, req.body.collectionId)) {
    return;
  }
  const newCard = new Card(req.body);
  newCard
    .save()
    .then((card) => {
      responseFormat.data = card;
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err.message;
      res.status(400).json(responseFormat);
    });
};

//Delete one card
const deleteCard = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);

  await Card.deleteOne({ _id: searchId })
    .then((ans) => {
      if (ans.deletedCount === 0) {
        responseFormat.data = null;
        responseFormat.message = "Nothing to delete";
        res.status(400).json(responseFormat);
      } else {
        responseFormat.message = "Success deleting";
        res.status(200).json(responseFormat);
      }
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
    });
};

//Update one card
const updateCard = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const searchId = new ObjectId(id);
  if (!verifyCardRequestUser(res, req.user._id, req.body.collectionId)) {
    return;
  }
  await Card.findByIdAndUpdate(searchId, body, { new: true })
    .then((newCard) => {
      responseFormat.data = newCard;

      if (!newCard) {
        responseFormat.message = "Card not found.";
        res.status(404).json(responseFormat);
      }
      responseFormat.data = newCard;
      responseFormat.message = "Success updating";
      res.status(200).json(responseFormat);
    })
    .catch((err) => {
      responseFormat.message = err;
      res.status(400).json(responseFormat);
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
