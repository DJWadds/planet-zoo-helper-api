const seedDB = require('../../');
const usersData = require('./users.json');
const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/planet-zoo-dev"

console.log(DB_URL)

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => seedDB(usersData))
  .then(() => mongoose.disconnect());