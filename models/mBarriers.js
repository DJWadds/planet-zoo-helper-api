const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarrierSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	dilapidationRate: {
		type: String,
		required: true
	},
	transprancy: {
		type: String,
		required: true
	},
	isClimbable: {
		type: Boolean,
		required: true
	},
	isWatertight: {
		type: Boolean,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("barriers", BarrierSchema);