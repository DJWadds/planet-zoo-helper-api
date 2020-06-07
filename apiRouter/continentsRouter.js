const express = require("express");
const continentRouter = express.Router();
const { getAllContinents, createContinent, getContinent, updateContinent } = require("../controllers/cContinents.js");

continentRouter.get("/", getAllContinents);
continentRouter.post("/", createContinent);
continentRouter.get("/:continent_name", getContinent);
continentRouter.post("/:continent_name", updateContinent);

// NO ROUTE EXISTS
continentRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = continentRouter;