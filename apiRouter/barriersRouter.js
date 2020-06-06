const express = require("express");
const usersRouter = express.Router();
const { createBarrier, updateBarrier, getAllBarriers, getBarrier } = require("../controllers/cBarriers.js");

usersRouter.get("/", getAllBarriers);
usersRouter.post("/", createBarrier);
usersRouter.get("/:barrier_name", getBarrier);
usersRouter.post("/:barrier_name", updateBarrier);

// NO ROUTE EXISTS
usersRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = usersRouter;