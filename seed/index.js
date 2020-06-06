const mongoose = require("mongoose");

const Users = require("../models/mUsers");
const Barriers = require("../models/mBarriers");
const UserRoles = require("../models/mUserRoles");
const EnrichmentItems = require("../models/mEnrichmentItems");

const formatUser = require("../utils/formatUser");
const createUserRolesKey = require("../utils/createUserRolesKey");

function seedDB(usersData, barriers, enrichmentItemsData) {
	return mongoose.connection
		.dropDatabase()
		.then(() => {
			console.log("database dropped");
			const roles = ["USER", "DEV", "ADMIN"].map(role => ({ name: role }));
			return Promise.all([
				UserRoles.insertMany(roles),
				Barriers.insertMany(barriers),
				EnrichmentItems.insertMany(enrichmentItemsData)
			]);
		})
		.then(([userRoleDocs, barrierDocs, enrichmentItemsDocs]) => {
			console.log(`inserted ${userRoleDocs.length} user roles`);
			console.log(`inserted ${barrierDocs.length} barriers`);
			console.log(`inserted ${enrichmentItemsDocs.length} enrichment items`);
			const userRoleKey = createUserRolesKey(userRoleDocs);
			const formattedUsers = usersData.map(user => formatUser(user, userRoleKey));
			return Promise.all([
				userRoleDocs,
				barrierDocs,
				enrichmentItemsDocs,
				Users.insertMany(formattedUsers)
			]);
		})
		.then(([userRoleDocs, barrierDocs, enrichmentItemsDocs, userDocs]) => {
			console.log(`inserted ${userDocs.length} users`);
			return { userDocs, userRoleDocs, barrierDocs, enrichmentItemsDocs };
		});
}

module.exports = seedDB;