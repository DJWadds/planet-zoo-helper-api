const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrichmentItemSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	image: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model("enrichmentItems", EnrichmentItemSchema);