const Biome = require("../models/mBiomes");
const checkUserAuth = require("../utils/checkUserAuth");

exports.getAllBiomes = async (req, res, next) => {
	try {
		const biomes = await Biome.find();
		res.send({biomes});
	} catch (err) {
		next({err});
	}
};

exports.createBiome = async (req, res, next) => {
	const { biome, auth } = req.body;
	if(!biome.name) res.send({ message: "Biome imcomplete"});
	try {
		const hasPermission = await checkUserAuth(auth.username, auth.password);
		if (hasPermission) {
			const biomes = await Biome.find();
			if (biomes.filter(savedBiome => savedBiome === biome.name).length > 0) {
				res.send({ message: "biome aleready exists"});
			}
			const savedBiome = await Biome.create(biome);
			res.status(201).send({ biome: savedBiome });
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
};

exports.getBiome = async (req, res, next) => {
	const { biome_name } = req.params;
	try {
		const biome = await Biome.findOne(({ name: biome_name }));
		res.send({biome});
	} catch (err) {
		next({err});
	}
};

exports.updateBiome = async (req, res, next) => {
	const { biome_name } = req.params;
	const { biome, auth } = req.body;
	if(!biome.name) res.send({ message: "biome imcomplete"});
	try {
		const hasPermission = await checkUserAuth(auth.username, auth.password);
		if (hasPermission) {
			const biomeDoc = await Biome.findOne(({ name: biome_name }));
			if (biome.name) biomeDoc.name = biome.name;
			const savedBiome = await biomeDoc.save();
			res.status(201).send({biome: savedBiome});
		}
	} catch (err) {
		next({err});
	}
	next({message: "You don't have permission to update users"});
};
