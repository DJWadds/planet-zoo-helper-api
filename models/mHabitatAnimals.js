const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HabitatAnimals = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	status: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "status",
		required: true
	},
	continent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "continents",
		required: true
	},
	biomes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "biomes",
		required: true
	},
	habitat: {
		type: Object,
		default: {
			landSpace: {
				type: Number,
				required: true
			},
			// waterSpace: {
			// 	type: Number,
			// 	required: true
			// },
			// cimbing: {
			// 	type: Number,
			// 	required: true
			// },
			// temperature: {
			// 	type: Object,
			// 	default: {
			// 		min: {
			// 			type: Number,
			// 			required: true
			// 		},
			// 		max: {
			// 			type: Number,
			// 			required: true
			// 		}
			// 	},
			// 	required: true
			// },
			// barrier: {
			// 	type: Object,
			// 	default: {

			// 	},
			// 	required: true
			// }
		},
		required: true
	}
});

module.exports = mongoose.model("biomes", HabitatAnimals);