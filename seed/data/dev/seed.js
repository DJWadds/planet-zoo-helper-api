const seedDB = require("../../");
const usersData = require("./users.json");
const barriers = require("./barriers");
const enrichmentItems = require("./enrichmentItems");
const continents = require("./continent");
const biomes = require("./biomes");
const habitatAnimals = require("./habitatAnimals");
const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/planet-zoo-dev";

console.log(DB_URL);

mongoose
	.connect(DB_URL, { useNewUrlParser: true })
	.then(() => seedDB(usersData, barriers, enrichmentItems, continents, biomes, habitatAnimals))
	.then(() => mongoose.disconnect());