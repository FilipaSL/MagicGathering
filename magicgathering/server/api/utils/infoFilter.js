const filterPassword = (userList) => {
  const filter = allUsers.map((user) => {
    return {
      _id: user._id,
      userName: user.userName,
      realName: user.realName,
      admin: user.admin,
    };
  });
  return filter;
};

module.exports = { filterPassword };
