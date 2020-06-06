const Users = require('../models/mUsers');
const passwordHash = require('password-hash');

module.exports = async (username, password) => {
  const users = await Users.find({ username }).populate("role");
  const user = users[0];
  return passwordHash.verify(password, users[0].password) && user.role.name === "ADMIN"
};
