const Card = require("../models/card.model");
const { ObjectId } = require('mongodb');

//Get all cards
const getAllCards = async (req, res) => {
  await Card.find()
    .then((allCards) => res.json(allCards))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Get one card
const getOneCard = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  await Card.findById(searchId)
    .then((card) => res.json(card))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Get collection Cards
const getCollectionCards = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  await Card.find({collectionId: searchId})
    .then((cards) => {res.json(cards)})
    .catch((err) => res.status(400).json("Error! " + err));
};

//Create new Card
const postCard = (req, res) => {
  const newCard = new Card(req.body);
  newCard
    .save()
    .then((card) => res.json(card))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Delete one card
const deleteCard = async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectId(id);
  await Card.deleteOne({ _id: searchId })
    .then(() => res.status(300).json("Success deleting"))
    .catch((err) => res.status(400).json("Error! " + err));
};

//Update one card
const updateCard = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const searchId = new ObjectId(id);
  await Card.findByIdAndUpdate(searchId, body)
    .then(() => res.status(300).json("Success updating"))
    .catch((err) => res.status(400).json("Error! " + err));
};

module.exports = { getAllCards, getOneCard, getCollectionCards, postCard, deleteCard, updateCard };
