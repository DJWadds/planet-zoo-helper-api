/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const { users, barriers, enrichmentItems } = require("../seed/data/test");
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
	beforeEach(() => {
		const usersData = [...users];
		const barriersData = [...barriers];
		const enrichmentItemsData = [...enrichmentItems];

		return seedDB(usersData, barriersData, enrichmentItemsData)
			.then(({userDocs, barrierDocs, enrichmentItemsDocs }) => {
				// USERS
				returnedUserDocs = userDocs;
				firstUserDoc = returnedUserDocs[0];
				// BARRIERS
				returnedBarrierDocs = barrierDocs;
				firstBarrierDoc = returnedBarrierDocs[0];
				// ENRICHMENT ITEMS
				returnedEnrichmentItemsDocs = enrichmentItemsDocs;
				firstEnrichmentItemsDoc = returnedEnrichmentItemsDocs[0];
			});
	});
	after(() => mongoose.disconnect());

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
		it("2) get /api/users/:user_name returns user if they exist", () => {
			const username = "test_user";
			return request
				.get(`/api/users/${username}`)
				.expect(200)
				.then(({body: {user}}) => {
					expect(user.username).equal(username);
					expect(passwordHash.verify("password", user.password)).equal(true);
				});
		});
		it("3) post /api/users/:user_name updates a user", () => {
			return request
				.post(`/api/users/${firstUserDoc.username
				}`)
				.send({role: "USER", password: "newPassword", adminPassword: "password", adminUsername: "test_user"})
				.expect(201)
				.then(({ body: {user} }) => {
					expect(user.username).equal(firstUserDoc.username);
					expect(passwordHash.verify("newPassword", user.password)).equal(true);
					expect(user.role.name).equal("USER");
				});
		});
		it("4) post /api/users creates a new user", () => {
			return request
				.post("/api/users")
				.send({ username: "new-user" , role: "USER", password: "test-password", adminPassword: "password", adminUsername: "test_user"})
				.expect(201)
				.then(({ body: {user} }) => {
					expect(user.username).equal("new-user");
					expect(passwordHash.verify("test-password", user.password)).equal(true);
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
		it("2) get /api/barriers/:barrier_name returns barrier if it exist", () => {
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
		it("3) post /api/barriers/:barrier_name updates a barrier", () => {
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
				.send({...barrier, adminPassword: "password", adminUsername: "test_user"})
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
		it("4) post /api/barriers creates a new user", () => {
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
				.send({ barrier, adminPassword: "password", adminUsername: "test_user"})
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
		it("2) get /api/enrichment-items/:enrichment_item_name returns enrichment item if it exist", () => {
			return request
				.get(`/api/enrichment-items/${firstEnrichmentItemsDoc.name}`)
				.expect(200)
				.then(({body: {enrichmentItem}}) => {
					expect(enrichmentItem.name).equal(firstEnrichmentItemsDoc.name);
					expect(enrichmentItem.image).equal(firstEnrichmentItemsDoc.image);
				});
		});
		it("3) post /api/enrichment-items/:enrichment_item_name updates an enrichment item", () => {
			const name = "new name";
			const image = "new image";
			return request
				.post(`/api/enrichment-items/${firstEnrichmentItemsDoc.name}`)
				.send({ name, image, adminPassword: "password", adminUsername: "test_user"})
				.expect(201)
				.then(({ body }) => {
					const returnedEnrichmentItem = body.enrichmentItem;
					expect(returnedEnrichmentItem.name).equal(name);
					expect(returnedEnrichmentItem.image).equal(image);
				});
		});
		it("4) post /api/enrichment-items creates a new user", () => {
			const name = "new name";
			const image = "new image";
			return request
				.post("/api/enrichment-items")
				.send({ enrichmentItem: {name, image}, adminPassword: "password", adminUsername: "test_user"})
				.expect(201)
				.then(({ body }) => {
					const returnedEnrichmentItem = body.enrichmentItem;
					expect(returnedEnrichmentItem.name).equal(name);
					expect(returnedEnrichmentItem.image).equal(image);
				});
		});
	}); 
});
