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

const verifyCardRequestUser = async (requestUser, collectionId) => {
  if (requestUser.admin === 1) return true;
  const aux = await Collection.findOne({
    _id: collectionId,
    userId: requestUser._id,
  });
  return aux;
};

const verifyCollRequestUser = (res, requestUser, userId) => {
  if (requestUser.admin === 1) return true;

  if (requestUser._id !== userId) {
    responseFormat.data = null;
    responseFormat.message =
      "User doesn't have permission to make this alteration.";
    return res.status(400).json(responseFormat);
  }
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
