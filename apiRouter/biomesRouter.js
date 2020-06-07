const express = require("express");
const biomesRouter = express.Router();
const { getAllBiomes, createBiome, getBiome, updateBiome } = require("../controllers/cBiomes");

biomesRouter.get("/", getAllBiomes);
biomesRouter.post("/", createBiome);
biomesRouter.get("/:biome_name", getBiome);
biomesRouter.post("/:biome_name", updateBiome);

// NO ROUTE EXISTS
biomesRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = biomesRouter;