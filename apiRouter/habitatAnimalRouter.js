const express = require("express");
const habitatAnimalRouter = express.Router();
const { getAllHabitatAnimals } = require("../controllers/cHabitatAnimals");

habitatAnimalRouter.get("/", getAllHabitatAnimals);
// usersRouter.post("/", createNewUser);
// usersRouter.get("/:username", getUser);
// usersRouter.post("/:username", updateUser);

// NO ROUTE EXISTS
habitatAnimalRouter.use("/*", (req, res, next) => {
	next({ status: 404});
});

module.exports = habitatAnimalRouter;