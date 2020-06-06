const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./usersRouter");
const barriersRouter = require("./barriersRouter");
const enrichmentItemsRouter = require("./enrichmentItemsRouter");

apiRouter.use("/users", usersRouter);
apiRouter.use("/barriers", barriersRouter);
apiRouter.use("/enrichment-items", enrichmentItemsRouter);

// NO ROUTE EXISTS
apiRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = apiRouter;