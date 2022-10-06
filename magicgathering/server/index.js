// server/index.js

const express = require("express");
const cors = require("cors");
const users = require("./data/users");
const cards = require("./data/cards");
const collections = require("./data/collections");
const config = require("./config");

const {port, allowedDomains} = config;

const PORT = port || 3001;

const app = express();

app.use(cors({origin: allowedDomains}))

//Pedidos API
app.get("/api/users", (req, res) => {
    res.json(users);
  });

app.get("/api/cards", (req, res) => {
    res.json(cards);
});

app.get("/api/collections", (req, res) => {
    res.json(collections);
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});