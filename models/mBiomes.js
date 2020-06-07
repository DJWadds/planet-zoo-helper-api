const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BiomeSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	}
});

module.exports = mongoose.model("biomes", BiomeSchema);