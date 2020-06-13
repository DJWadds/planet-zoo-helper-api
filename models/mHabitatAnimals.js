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
			waterSpace: {
				type: Number,
				required: true
			},
			climbingSpace: {
				type: Number,
				required: true
			},
			temperature: {
				type: Object,
				default: {
					min: {
						type: Number,
						required: true
					},
					max: {
						type: Number,
						required: true
					}
				},
				required: true
			},
			barrier: {
				type: Object,
				default: {
					grade: {
						type: Number,
						required: true
					},
					minHeight: {
						type: Number,
						required: true
					},
					isClimbProof: {
						type: Boolean,
						required: true
					},
				},
				required: true
			},
		},
	},
	social: {
		type: Object,
		default: {
			groupSize: {
				type: Object,
				default: {
					overall: {
						type: Object,
						default: {
							male: {
								type: Number,
								isRequired: true
							},
							female: {
								type: Number,
								isRequired: true
							}
						},
						isRequired: true
					},
					maleOnly: {
						type: Number,
						required: true
					},
					femaleOnly: {
						type: Number,
						required: true
					}
				},
				isRequired: true
			},
			guestCanEnter: {
				type: Boolean,
				isRequired: true
			},
			lifeExpectancy: {
				type: Object,
				default: {
					male: {
						type: Number,
						required: true
					},
					female: {
						type: Number,
						required: true
					}
				},
				isRequired: true
			},
			sexualActivity: {
				type: Object,
				default: {
					min: {
						type: Number,
						required: true
					},
					max: {
						type: Number,
						required: true
					}
				},
				isRequired: true
			},
			offspringPerPregnancy: {
				type: Number,
				required: true
			},
			incubationPeriod: {
				type: Number,
				required: true
			},
			interbirthPeriod: {
				type: Number,
				required: true
			},
			chanceOfReproduction: {
				type: Number,
				required: true
			}
		},
		interspeciesEnrichment: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
			ref: "habitatAnimals"
		},
		enrichmentItems: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
			ref: "enrichmentItems"
		},
		isRequired: true
	}
});

module.exports = mongoose.model("habitatAnimals", HabitatAnimals);