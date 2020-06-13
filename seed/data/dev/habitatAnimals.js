module.exports = [
	{
		name: "Aardvark",
		image: "ardvark-image",
		status: "Least Concern",
		continent: "Africa",
		biomes: ["Temp", "Artic"],
		habitat: {
			landSpace: 330,
			waterSpace: 0,
			climbingSpace: 0,
			temperature: {
				min: 16,
				max: 40
			},
			barrier: {
				grade: 2,
				minHeight: 0.5,
				isClimbProof: false
			}
		},
		social: {
			groupSize: {
				overall: {
					male: 1,
					female: 1
				},
				maleOnly: 1,
				femaleOnly: 1
			},
			guestCanEnter: true,
			lifeExpectancy: {
				male: 1,
				female: 1
			},
			lifeCycle: {
				sexualActivity: {
					min: 1,
					max: 2
				},
				offspringPerPregnancy: 1,
				incubationPeriod: 1,
				interbirthPeriod: 1,
				chanceOfReproduction: 12
			}
		},
		interspeciesEnrichment: [],
		enrichmentItems: []
	}
];