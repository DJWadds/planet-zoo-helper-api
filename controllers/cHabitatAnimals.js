const HabitatAnimal = require("../models/mHabitatAnimals");
// const getAllHabitatAnimals = require("../utils/checkUserAuth");

exports.getAllHabitatAnimals = async (req, res, next) => {
	try {
		const habitatAnimals = await HabitatAnimal.find();
		res.send({habitatAnimals});
	} catch (err) {
		next({err});
	}
};

