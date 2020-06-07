const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContinentSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	}
});

module.exports = mongoose.model("continents", ContinentSchema);