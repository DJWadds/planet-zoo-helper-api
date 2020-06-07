const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	level: {
		type: Number,
		required: true
	},
});

module.exports = mongoose.model("status", StatusSchema);