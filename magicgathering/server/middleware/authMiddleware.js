const jwt = require("jsonwebtoken");
const User = require("../api/models/user.model");
var ObjectId = require("mongoose").Types.ObjectId;

const protect = async (req, res, next) => {
  let token;

  if (req.params.id) {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(401);
      res.status(401).json("Invalid parameter: id must be an hexadecimal!");
      return;
    }
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.REACT_APP_JWT_TOKEN);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json("Error! " + error);
    }
  }

  if (!token) {
    res.status(401);
    res.status(401).json("Not authorized, no token! ");
  }

  if (!req.user) {
    res.status(401);
    res.status(401).json("Not authorized, user does not exists! ");
  }
};

module.exports = { protect };
