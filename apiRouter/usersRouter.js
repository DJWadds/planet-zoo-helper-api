const express = require("express");
const usersRouter = express.Router();
const { getAllUsers, createNewUser, getUser, updateUser } = require("../controllers/cUsers");

usersRouter.get("/", getAllUsers);
usersRouter.post("/", createNewUser);
usersRouter.get("/:username", getUser);
usersRouter.post("/:username", updateUser);

// NO ROUTE EXISTS
usersRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = usersRouter;