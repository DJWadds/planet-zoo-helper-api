const EnrichmentItems = require("../models/mEnrichmentItems");
const checkUserAuth = require("../utils/checkUserAuth");

exports.getAllEnrichmentItems = async (req, res, next) => {
	try {
		const enrichmentItems = await EnrichmentItems.find();
		res.send({enrichmentItems});
	} catch (err) {
		next({err});
	}
};

exports.createEnrichmentItem = async (req, res, next) => {
	const { enrichmentItem, adminPassword, adminUsername } = req.body;
	if(!enrichmentItem.name || !enrichmentItem.image) res.send({ message: "Enrichmanet Item imcomplete"});
	try {
		const hasPermission = await checkUserAuth(adminUsername, adminPassword);
		if (hasPermission) {
			const enrichmentItems = await EnrichmentItems.find();
			if (enrichmentItems.filter(savedenrichmentItems => savedenrichmentItems.name === enrichmentItem.name).length > 0) {
				res.send({ message: "nrichmanet Item aleready exists"});
			}
			const savedEnrichmentItem = await EnrichmentItems.create(enrichmentItem);
			res.status(201).send({ enrichmentItem: savedEnrichmentItem });
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
};

exports.getEnrichmentItem = async (req, res, next) => {
	const { enrichment_item_name } = req.params;
	try {
		const enrichmentItem = await EnrichmentItems.findOne(({ name: enrichment_item_name }));
		res.send({enrichmentItem});
	} catch (err) {
		next({err});
	}
};

exports.updateEnrichmentItem = async (req, res, next) => {
	const { enrichment_item_name } = req.params;
	const { 
		name,
		image, 
		adminPassword, 
		adminUsername 
	} = req.body;
	try {
		const hasPermission = await checkUserAuth(adminUsername, adminPassword);
		if (hasPermission) {
			const enrichmentItemDoc = await EnrichmentItems.findOne(({ name: enrichment_item_name }));
			if (name) enrichmentItemDoc.name = name;
			if (image) enrichmentItemDoc.image = image;
			const enrichmentItem = await enrichmentItemDoc.save();
			res.status(201).send({enrichmentItem});
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
}; 