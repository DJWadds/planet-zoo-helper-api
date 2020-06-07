module.exports = 
userRoles => userRoles.reduce((acc, role) => {
	acc[role.name] = role._id;
	return acc;
}, {});