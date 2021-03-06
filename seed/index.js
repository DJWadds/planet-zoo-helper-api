const mongoose = require("mongoose");

const Users = require("../models/mUsers");
const Barriers = require("../models/mBarriers");
const UserRoles = require("../models/mUserRoles");
const EnrichmentItems = require("../models/mEnrichmentItems");
const Continents = require("../models/mContinents");
const Biomes = require("../models/mBiomes");
const Status = require("../models/mStatus");
const HabitatAnimals = require("../models/mHabitatAnimals");

const formatUser = require("../utils/formatUser");
const createUserRolesKey = require("../utils/createUserRolesKey");
const createKey = require("../utils/createKey");
const formatHabitatAnimal = require("../utils/formatHabitatAnimal");

const status = [
	{ name: "Unkown", level: 0 },
	{ name: "Domesticated", level: 1 },
	{ name: "Least Concern", level: 2 },
	{ name: "Near Threatened", level: 3 },
	{ name: "Vulnerable", level: 4 },
	{ name: "Endangered", level: 5 },
	{ name: "Critically Endangered", level: 6 },
	{ name: "Extinct in Wild", level: 7 }
];

function seedDB(usersData, barriers, enrichmentItems, continents, biomes, habitatAnimals) {
	return mongoose.connection
		.dropDatabase()
		.then(() => {
			console.log("database dropped");
			const roles = ["USER", "DEV", "ADMIN"].map(role => ({ name: role }));
			return Promise.all([
				UserRoles.insertMany(roles),
				Barriers.insertMany(barriers),
				EnrichmentItems.insertMany(enrichmentItems),
				Continents.insertMany(continents),
				Biomes.insertMany(biomes),
				Status.insertMany(status)
			]);
		})
		.then(([userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs, statusDocs]) => {
			console.log(`inserted ${userRoleDocs.length} user roles`);
			console.log(`inserted ${barrierDocs.length} barriers`);
			console.log(`inserted ${enrichmentItemsDocs.length} enrichment items`);
			console.log(`inserted ${continentDocs.length} continents`);
			console.log(`inserted ${biomeDocs.length} biomes`);
			console.log(`inserted ${statusDocs.length} status`);
			const userRoleKey = createUserRolesKey(userRoleDocs);
			const formattedUsers = usersData.map(user => formatUser(user, userRoleKey));
			const statusKeys = createKey(statusDocs);
			const continentKeys = createKey(continentDocs);
			const biomeKeys = createKey(biomeDocs);
			const formattedHabitatAnimals = habitatAnimals.map(habitatAnimal => formatHabitatAnimal(habitatAnimal, statusKeys, continentKeys, biomeKeys));
			return Promise.all([
				userRoleDocs,
				barrierDocs,
				enrichmentItemsDocs,
				continentDocs, 
				biomeDocs,
				statusDocs,
				Users.insertMany(formattedUsers),
				HabitatAnimals.insertMany(formattedHabitatAnimals)
			]);
		})
		.then(([userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs, statusDocs, userDocs, habitatAnimalDocs]) => {
			console.log(`inserted ${userDocs.length} users`);
			console.log(`inserted ${habitatAnimalDocs.length} habitat animals`);
			return { userDocs, userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, statusDocs, biomeDocs, habitatAnimalDocs };
		});
}

module.exports = seedDB;