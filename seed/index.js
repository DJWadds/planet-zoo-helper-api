const mongoose = require("mongoose");

const Users = require("../models/mUsers");
const Barriers = require("../models/mBarriers");
const UserRoles = require("../models/mUserRoles");
const EnrichmentItems = require("../models/mEnrichmentItems");
const Continents = require("../models/mContinents");
const Biomes = require("../models/mBiomes");
const Status = require("../models/mStatus");

const formatUser = require("../utils/formatUser");
const createUserRolesKey = require("../utils/createUserRolesKey");

const status = [
	{ name: "Unkown", level: 0 },
	{ name: "Domesticated", level: 1 },
	{ name: "Least Concern", level: 2 },
	{ name: "Near Threatened", level: 3 },
	{ name: "Vulnerable", level: 4 },
	{ name: "Endangered", level: 5 },
	{ name: "Critically Endangered", level: 6 },
	{ name: "Extinct in Wild", level: 7 }
]

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
			// const 
			return Promise.all([
				userRoleDocs,
				barrierDocs,
				enrichmentItemsDocs,
				continentDocs, 
				biomeDocs,
				statusDocs,
				Users.insertMany(formattedUsers)
			]);
		})
		.then(([userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs, statusDocs, userDocs]) => {
			console.log(`inserted ${userDocs.length} users`);
			return { userDocs, userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs };
		});
}

module.exports = seedDB;