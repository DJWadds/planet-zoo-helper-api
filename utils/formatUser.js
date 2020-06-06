const passwordHash = require('password-hash');

module.exports = (user, userRolesKey) => {
  return {
    username: user.username,
    password: passwordHash.generate(user.password),
    role: userRolesKey[user.role]
  }
}