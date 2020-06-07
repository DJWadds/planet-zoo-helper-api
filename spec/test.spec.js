/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const { users, barriers, enrichmentItems, continents, biomes, habitatAnimals } = require("../seed/data/test");
const seedDB = require("../seed");
const mongoose = require("mongoose");
const passwordHash = require("password-hash");

describe("/api", () => {
	let returnedUserDocs;
	let firstUserDoc;
	let returnedBarrierDocs;
	let firstBarrierDoc;
	let returnedEnrichmentItemsDocs;
	let firstEnrichmentItemsDoc;
	let returnedContinentDocs;
	let firstContinentDoc;
	beforeEach(() => {
		const usersData = [...users];
		const barriersData = [...barriers];
		const enrichmentItemsData = [...enrichmentItems];
		const continentsData = [...continents];
		const biomesData = [...biomes];
		const habitatAnimalsData = [...habitatAnimals];

		return seedDB(usersData, barriersData, enrichmentItemsData, continentsData, biomesData, habitatAnimalsData)
			.then(({userDocs, barrierDocs, enrichmentItemsDocs, continentDocs, biomeDocs }) => {
				// USERS
				returnedUserDocs = userDocs;
				firstUserDoc = returnedUserDocs[0];
				// BARRIERS
				returnedBarrierDocs = barrierDocs;
				firstBarrierDoc = returnedBarrierDocs[0];
				// ENRICHMENT ITEMS
				returnedEnrichmentItemsDocs = enrichmentItemsDocs;
				firstEnrichmentItemsDoc = returnedEnrichmentItemsDocs[0];
				// CONTINENTS
				returnedContinentDocs = continentDocs;
				firstContinentDoc = returnedContinentDocs[0];
				// BIOMES
				returnedBiomesDocs = biomeDocs;
				firstBiomeDoc = returnedBiomesDocs[0];
			});
	});
	after(() => mongoose.disconnect());

	const auth = {password: "password", username: "test_user"};

	describe("/users", () => {
		it("1) get /api/users/ returns all the possible users", () => {
			return request
				.get("/api/users")
				.expect(200)
				.then(({body: {users}}) => {
					expect(users.length).equal(2);
					const user = users[0];
					expect(user.username).equal(firstUserDoc.username);
					expect(passwordHash.verify("password", user.password)).equal(true);
				});
		});
		it("2) post /api/users creates a new user", () => {
			return request
				.post("/api/users")
				.send({ user: { username: "new-user" , role: "USER", password: "test-password"}, auth})
				.expect(201)
				.then(({ body: {user} }) => {
					expect(user.username).equal("new-user");
					expect(passwordHash.verify("test-password", user.password)).equal(true);
					expect(user.role.name).equal("USER");
				});
		});
		it("3) get /api/users/:user_name returns user if they exist", () => {
			const username = "test_user";
			return request
				.get(`/api/users/${username}`)
				.expect(200)
				.then(({body: {user}}) => {
					expect(user.username).equal(username);
					expect(passwordHash.verify("password", user.password)).equal(true);
				});
		});
		it("4) post /api/users/:user_name updates a user", () => {
			return request
				.post(`/api/users/${firstUserDoc.username}`)
				.send({ user: {role: "USER", password: "newPassword"}, auth })
				.expect(201)
				.then(({ body: {user} }) => {
					expect(user.username).equal(firstUserDoc.username);
					expect(passwordHash.verify("newPassword", user.password)).equal(true);
					expect(user.role.name).equal("USER");
				});
		});
	});

	describe("/barriers", () => {
		it("1) get /api/barriers/ returns all the possible barriers", () => {
			return request
				.get("/api/barriers")
				.expect(200)
				.then(({body: {barriers}}) => {
					expect(barriers.length).equal(2);
				});
		});
		it("2) post /api/barriers creates a new user", () => {
			const barrier = {
				name: "new name",
				dilapidationRate: "low",
				image: "new image",
				isClimbable: true,
				isWatertight: false,
				transprancy: "low"
			};
			return request
				.post("/api/barriers")
				.send({ barrier, auth})
				.expect(201)
				.then(({ body }) => {
					const returnedBarrier = body.barrier;
					expect(returnedBarrier.name).equal(barrier.name);
					expect(returnedBarrier.dilapidationRate).equal(barrier.dilapidationRate);
					expect(returnedBarrier.image).equal(barrier.image);
					expect(returnedBarrier.isClimbable).equal(barrier.isClimbable);
					expect(returnedBarrier.isWatertight).equal(barrier.isWatertight);
					expect(returnedBarrier.transprancy).equal(barrier.transprancy);
				});
		});
		it("3) get /api/barriers/:barrier_name returns barrier if it exist", () => {
			return request
				.get(`/api/barriers/${firstBarrierDoc.name}`)
				.expect(200)
				.then(({body: {barrier}}) => {
					expect(barrier.name).equal(firstBarrierDoc.name);
					expect(barrier.dilapidationRate).equal(firstBarrierDoc.dilapidationRate);
					expect(barrier.image).equal(firstBarrierDoc.image);
					expect(barrier.isClimbable).equal(firstBarrierDoc.isClimbable);
					expect(barrier.isWatertight).equal(firstBarrierDoc.isWatertight);
					expect(barrier.transprancy).equal(firstBarrierDoc.transprancy);
				});
		});
		it("4) post /api/barriers/:barrier_name updates a barrier", () => {
			const barrier = {
				name: "new name",
				dilapidationRate: "low",
				image: "new image",
				isClimbable: true,
				isWatertight: false,
				transprancy: "low"
			};
			return request
				.post(`/api/barriers/${firstBarrierDoc.name}`)
				.send({barrier, auth})
				.expect(201)
				.then(({ body }) => {
					const returnedBarrier = body.barrier;
					expect(returnedBarrier.name).equal(barrier.name);
					expect(returnedBarrier.dilapidationRate).equal(barrier.dilapidationRate);
					expect(returnedBarrier.image).equal(barrier.image);
					expect(returnedBarrier.isClimbable).equal(barrier.isClimbable);
					expect(returnedBarrier.isWatertight).equal(barrier.isWatertight);
					expect(returnedBarrier.transprancy).equal(barrier.transprancy);
				});
		});
	}); 

	describe("/enrichment-items", () => {
		it("1) get /api/enrichment-items/ returns all the possible enrichment items", () => {
			return request
				.get("/api/enrichment-items")
				.expect(200)
				.then(({body: {enrichmentItems}}) => {
					expect(enrichmentItems.length).equal(2);
				});
		});
		it("2) post /api/enrichment-items creates a new enrichment item", () => {
			const name = "new name";
			const image = "new image";
			return request
				.post("/api/enrichment-items")
				.send({ enrichmentItem: {name, image}, auth})
				.expect(201)
				.then(({ body }) => {
					const returnedEnrichmentItem = body.enrichmentItem;
					expect(returnedEnrichmentItem.name).equal(name);
					expect(returnedEnrichmentItem.image).equal(image);
				});
		});
		it("3) get /api/enrichment-items/:enrichment_item_name returns enrichment item if it exist", () => {
			return request
				.get(`/api/enrichment-items/${firstEnrichmentItemsDoc.name}`)
				.expect(200)
				.then(({body: {enrichmentItem}}) => {
					expect(enrichmentItem.name).equal(firstEnrichmentItemsDoc.name);
					expect(enrichmentItem.image).equal(firstEnrichmentItemsDoc.image);
				});
		});
		it("4) post /api/enrichment-items/:enrichment_item_name updates an enrichment item", () => {
			const name = "new name";
			const image = "new image";
			return request
				.post(`/api/enrichment-items/${firstEnrichmentItemsDoc.name}`)
				.send({ enrichmentItem: {name, image}, auth})
				.expect(201)
				.then(({ body }) => {
					const returnedEnrichmentItem = body.enrichmentItem;
					expect(returnedEnrichmentItem.name).equal(name);
					expect(returnedEnrichmentItem.image).equal(image);
				});
		});
	}); 

	describe("/continents", () => {
		it("1) get /api/continents/ returns all the possible continents", () => {
			return request
				.get("/api/continents")
				.expect(200)
				.then(({body: {continents}}) => {
					expect(continents.length).equal(2);
				});
		});
		it("2) post /api/continents creates a new continent", () => {
			const name = "new name";
			return request
				.post("/api/continents")
				.send({ continent: {name}, auth})
				.expect(201)
				.then(({ body: {continent} }) => {
					expect(continent.name).equal(name);
				});
		});
		it("3) get /api/continents/:continent_name returns continent if it exist", () => {
			return request
				.get(`/api/continents/${firstContinentDoc.name}`)
				.expect(200)
				.then(({body: {continent}}) => {
					expect(continent.name).equal(firstContinentDoc.name);
				});
		});
		it("4) post /api/continents/:continent_name updates a continent", () => {
			const name = "new name";
			return request
				.post(`/api/continents/${firstContinentDoc.name}`)
				.send({ continent: {name}, auth})
				.expect(201)
				.then(({ body: {continent} }) => {
					expect(continent.name).equal(name);
				});
		});
	}); 

	describe("/biomes", () => {
		it("1) get /api/biomes/ returns all the possible biomes", () => {
			return request
				.get("/api/biomes")
				.expect(200)
				.then(({body: {biomes}}) => {
					expect(biomes.length).equal(2);
				});
		});
		it("2) post /api/biomes creates a new biomes", () => {
			const name = "new name";
			return request
				.post("/api/biomes")
				.send({ biome: {name}, auth})
				.expect(201)
				.then(({ body: {biome} }) => {
					expect(biome.name).equal(name);
				});
		});
		it("3) get /api/biomes/:biome_name returns biomes if it exist", () => {
			return request
				.get(`/api/biomes/${firstBiomeDoc.name}`)
				.expect(200)
				.then(({body: {biome}}) => {
					expect(biome.name).equal(firstBiomeDoc.name);
				});
		});
		it("4) post /api/biomes/:biome_name updates an biomes", () => {
			const name = "new name";
			return request
				.post(`/api/biomes/${firstBiomeDoc.name}`)
				.send({ biome: {name}, auth})
				.expect(201)
				.then(({ body: {biome} }) => {
					expect(biome.name).equal(name);
				});
		});
	}); 
});
