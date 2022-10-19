const Collection = require("../../models/collection.model");
const responseFormat = require("../../utils/responseFormat");

const verifyIsAdmin = (res, admin) => {
  if (admin === 0) {
    responseFormat.data = null;
    responseFormat.message =
      "User has no permission to perform operation. Try again with an admin.";
    res.status(400).json(responseFormat);
    return false;
  }
  return true;
};

const verifyCardRequestUser = async (res, requestUser, collectionId) => {
  if (requestUser.admin === 0) {
    await Collection.find({ _id: collectionId }).then((coll) => {
      if (requestUser._id !== coll.userId) {
        responseFormat.data = null;
        responseFormat.message = "User has permission to make this alteration.";
        res.status(400).json(responseFormat);
        return false;
      }
      return true;
    });
  }
  return true;
};

const verifyCollRequestUser = (res, requestUser, userId) => {
  if (requestUser.admin === 0) {
    if (requestUser._id !== userId) {
      responseFormat.data = null;
      responseFormat.message = "User has permission to make this alteration.";
      res.status(400).json(responseFormat);
      return false;
    }
  }
  return true;
};

const collectionFilter = (searchId, user) => {
  let filter = {
    _id: searchId,
  };

  if (user.admin === 0) {
    filter = {
      ...filter,
      userId: user._id,
    };
  }

  return filter;
};

module.exports = {
  verifyIsAdmin,
  verifyCardRequestUser,
  verifyCollRequestUser,
  collectionFilter,
};
