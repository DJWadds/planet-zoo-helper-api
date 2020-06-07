const mongoose = require("mongoose");

const Users = require("../models/mUsers");
const Barriers = require("../models/mBarriers");
const UserRoles = require("../models/mUserRoles");
const EnrichmentItems = require("../models/mEnrichmentItems");
const Continents = require("../models/mContinents");
const Biomes = require("../models/mBiomes");

const formatUser = require("../utils/formatUser");
const createUserRolesKey = require("../utils/createUserRolesKey");

function seedDB(usersData, barriers, enrichmentItems, continents, biomes) {
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
			]);
		})
		.then(([userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs]) => {
			console.log(`inserted ${userRoleDocs.length} user roles`);
			console.log(`inserted ${barrierDocs.length} barriers`);
			console.log(`inserted ${enrichmentItemsDocs.length} enrichment items`);
			console.log(`inserted ${continentDocs.length} continents`);
			console.log(`inserted ${biomeDocs.length} biomes`);
			const userRoleKey = createUserRolesKey(userRoleDocs);
			const formattedUsers = usersData.map(user => formatUser(user, userRoleKey));
			return Promise.all([
				userRoleDocs,
				barrierDocs,
				enrichmentItemsDocs,
				continentDocs, 
				biomeDocs,
				Users.insertMany(formattedUsers)
			]);
		})
		.then(([userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs, userDocs]) => {
			console.log(`inserted ${userDocs.length} users`);
			return { userDocs, userRoleDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs };
		});
}

module.exports = seedDB;