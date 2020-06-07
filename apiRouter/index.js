const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./usersRouter");
const barriersRouter = require("./barriersRouter");
const enrichmentItemsRouter = require("./enrichmentItemsRouter");
const continentRouter = require("./continentsRouter");
const biomesRouter = require("./biomesRouter");

apiRouter.use("/users", usersRouter);
apiRouter.use("/barriers", barriersRouter);
apiRouter.use("/enrichment-items", enrichmentItemsRouter);
apiRouter.use("/continents", continentRouter);
apiRouter.use("/biomes", biomesRouter);

// NO ROUTE EXISTS
apiRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = apiRouter;