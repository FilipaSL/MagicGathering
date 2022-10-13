const express = require("express");
const Card = require("../models/card.model");
const User = require("../models/user.model");
const Collection = require("../models/collection.model");
var ObjectID = require("mongodb").ObjectID;

const router = express.Router();

//User routes

//Get user through username + pass
router.get("/user/:pass/:usr", async (req, res) => {
  const pass = req.params.pass;
  const username = req.params.usr;

  const user = await User.findOne({ password: pass, userName: username });
  res.send(user);
});

//Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Collections Routes

//All official collections belonging to a user
router.get("/collections/user/:id", async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectID(id);

  const collections = await Collection.find({ userId: searchId, official: 1 });

  if (collections) {
    res.send(collections);
    return;
  }

  res.status(404).send("User does not have collections");
});

//ID of the unOfficial collections belonging to a user
router.get("/unCollections/user/:id", async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectID(id);

  let coll = await Collection.findOne({ userId: searchId, official: 0 });
  if (coll) {
    res.send(coll);
    return;
  }

  res.status(404).send("User does not have cards without collection");
});

//Cards Routes

//All cards belonging to a user
router.get("/cards/:id", async (req, res) => {
  const id = req.params.id;
  const searchId = new ObjectID(id);

  //it can be more than one element
  let userCollection = await Collection.find({ userId: searchId });
  let allCards = await Card.find();

  //it can be an official or not and it will create empty results
  if (userCollection) {
    let userCards = userCollection.map((userCol) => {
      if (allCards) {
        return allCards.filter((elem) => {
          return elem.collectionId == userCol.id;
        });
      }
    });

    if (userCards) {
      //clean empty results
      let desiredCards = userCards.filter((entry) => entry.length > 0);

      res.send(desiredCards);
      return;
    }
  }

  res.status(404).send("User does not have cards");
});

router.delete("/card/:id", async (req, res) => {
  // reading id from the URL
  const id = req.params.id;
  const searchId = new ObjectID(id);

  try {
    await Card.deleteOne({ _id: searchId });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Card doesn't exist!" });
  }
});

router.patch("/card/:id", async (req, res) => {
  // reading id from the URL
  const id = req.params.id;
  const newCard = req.body;

  console.log(newCard);
  console.log(id);

  const searchId = new ObjectID(id);

  try {
    const oldCard = await Card.findOne({ _id: searchId });

    if (newCard) {
      oldCard.cardName = newCard.cardName;
      oldCard.value = newCard.value;
      oldCard.description = newCard.description;
    }

    await oldCard.save();
    res.send(oldCard);
  } catch (error) {
    res.status(404);
    res.send({ error: "Card was not updated due to: " + error });
  }
});

module.exports = router;
