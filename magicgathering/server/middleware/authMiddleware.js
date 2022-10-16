const jwt = require("jsonwebtoken");
const User = require("../api/models/user.model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.REACT_APP_JWT_TOKEN);
      console.log(decoded);
      console.log(req.user);

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
};

module.exports = { protect };
