const seedDB = require("../../");
const { users, barriers } = require(".");
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/planet-zoo-test")
	.then(() => seedDB(users, barriers))
	.then(() => mongoose.disconnect())
	.catch(err => {
		console.log("err: ", err);
		mongoose.disconnect();
	});