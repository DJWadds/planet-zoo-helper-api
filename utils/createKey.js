module.exports = 
dataItems => dataItems.reduce((acc, dataItem) => {
	acc[dataItem.name] = dataItem._id;
	return acc;
}, {});