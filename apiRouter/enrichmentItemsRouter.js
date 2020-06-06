const express = require("express");
const usersRouter = express.Router();
const { getAllEnrichmentItems, createEnrichmentItem, getEnrichmentItem, updateEnrichmentItem } = require("../controllers/cEnrichmentItems.js");

usersRouter.get("/", getAllEnrichmentItems);
usersRouter.post("/", createEnrichmentItem);
usersRouter.get("/:enrichment_item_name", getEnrichmentItem);
usersRouter.post("/:enrichment_item_name", updateEnrichmentItem);
// NO ROUTE EXISTS
usersRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = usersRouter;