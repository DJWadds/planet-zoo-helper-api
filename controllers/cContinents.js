const Continent = require("../models/mContinents");
const checkUserAuth = require("../utils/checkUserAuth");

exports.getAllContinents = async (req, res, next) => {
	try {
		const continents = await Continent.find();
		res.send({continents});
	} catch (err) {
		next({err});
	}
};

exports.createContinent = async (req, res, next) => {
	const { continent, auth } = req.body;
	if(!continent.name) res.send({ message: "Continent imcomplete"});
	try {
		const hasPermission = await checkUserAuth(auth.username, auth.password);
		if (hasPermission) {
			const continents = await Continent.find();
			if (continents.filter(savedContinent => savedContinent === continent.name).length > 0) {
				res.send({ message: "continent aleready exists"});
			}
			const savedContinent = await Continent.create(continent);
			res.status(201).send({ continent: savedContinent });
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
};

exports.getContinent = async (req, res, next) => {
	const { continent_name } = req.params;
	try {
		const continent = await Continent.findOne(({ name: continent_name }));
		res.send({continent});
	} catch (err) {
		next({err});
	}
};

exports.updateContinent = async (req, res, next) => {
	const { continent_name } = req.params;
	const { continent, auth } = req.body;
	if(!continent.name) res.send({ message: "Continent imcomplete"});
	try {
		const hasPermission = await checkUserAuth(auth.username, auth.password);
		if (hasPermission) {
			const continentDoc = await Continent.findOne(({ name: continent_name }));
			if (continent.name) continentDoc.name = continent.name;
			const savedContinent = await continentDoc.save();
			res.status(201).send({continent: savedContinent});
		}
	} catch (err) {
		next({err});
	}
	next({message: "You don't have permission to update users"});
};
