// server/index.js

const express = require("express");
const cors = require("cors");

var bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");

// Import API route
//var routes = require("./api/routes"); //importing route
const userRoutes = require("./api/routes/user.routes");
const cardRoutes = require("./api/routes/card.routes");
const collectionRoutes = require("./api/routes/collection.routes");
const loginRoutes = require("./api/routes/login.routes");

const authMiddleware = require("./middleware/authMiddleware");

const { allowedDomains } = config;

const PORT = process.env.PORT;

var uri = process.env.REACT_APP_ATLAS_CONNECTION;

// Declare a variable named option and assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const app = express();

app.use(cors({ origin: allowedDomains }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected.");
});

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);
app.use("/collections", collectionRoutes);
app.use("/login", loginRoutes);

app.use(authMiddleware.protect);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
