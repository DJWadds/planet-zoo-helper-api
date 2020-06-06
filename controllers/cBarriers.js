const Barriers = require("../models/mBarriers");
const checkUserAuth = require("../utils/checkUserAuth");

exports.getAllBarriers = async (req, res, next) => {
	try {
		const barriers = await Barriers.find();
		res.send({barriers});
	} catch (err) {
		next({err});
	}
};

exports.getBarrier = async (req, res, next) => {
	const { barrier_name} = req.params;
	try {
		const barrier = await Barriers.findOne(({ name: barrier_name }));
		res.send({barrier});
	} catch (err) {
		next({err});
	}
};

exports.createBarrier = async (req, res, next) => {
	const { barrier, adminPassword, adminUsername } = req.body;
	const {name,
		dilapidationRate,
		image,
		isClimbable,
		isWatertight,
		transprancy} = barrier;
	const barrierCheck = [name,
		dilapidationRate,
		image,
		isClimbable,
		isWatertight,
		transprancy].filter(param => param === undefined);
	if(barrierCheck.length !== 0) res.send({ message: "Barrier imcomplete"});
	try {
		const hasPermission = await checkUserAuth(adminUsername, adminPassword);
		if (hasPermission) {
			const barriers = await Barriers.find();
			if (barriers.filter(savedBarrier => savedBarrier.name === barrier.name).length > 0) {
				res.send({ message: "barrier aleready exists"});
			}
			const savedBarrier = await Barriers.create(barrier);
			res.status(201).send({ barrier: savedBarrier });
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
};

exports.updateBarrier = async (req, res, next) => {
	const { barrier_name } = req.params;
	const { 
		name, 
		dilapidationRate, 
		transprancy, 
		isClimbable, 
		isWatertight, 
		image, 
		adminPassword, 
		adminUsername 
	} = req.body;
	try {
		const hasPermission = await checkUserAuth(adminUsername, adminPassword);
		if (hasPermission) {
			const barrierDoc = await Barriers.findOne(({ name: barrier_name }));
			if (name) barrierDoc.name = name;
			if (dilapidationRate) barrierDoc.dilapidationRate = dilapidationRate;
			if (transprancy) barrierDoc.transprancy = transprancy;
			if (isClimbable !== undefined) barrierDoc.isClimbable = isClimbable;
			if (isWatertight !== undefined) barrierDoc.isWatertight = isWatertight;
			if (image) barrierDoc.image = image;
			const barrier = await barrierDoc.save();
			res.status(201).send({barrier});
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
}; 
