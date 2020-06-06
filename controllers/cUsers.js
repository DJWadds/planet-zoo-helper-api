const passwordHash = require("password-hash");
const Users = require("../models/mUsers");
const UserRoles = require("../models/mUserRoles");
const checkUserAuth = require("../utils/checkUserAuth");
const createUserRolesKey = require("../utils/createUserRolesKey");

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await Users.find().populate("role");
		res.send({users});
	} catch (err) {
		next({err});
	}
};

exports.getUser = (req, res, next) => {
	const { username } = req.params;
	return Users.findOne({ username })
		.then(user => {
			res.send({user});
		})
		.catch(() => next({status:404}));
};

exports.updateUser = async (req, res, next) => {
	const { username } = req.params;
	const { role, password, adminPassword, adminUsername } = req.body;
	try {
		const hasPermission = await checkUserAuth(adminUsername, adminPassword);
		if (hasPermission) {
			const usersPromise = Users.findOne({ username }).populate("role");
			const userRolesPromise = UserRoles.find();
			const userDoc = await usersPromise;
			const userRoles = await userRolesPromise;
			if (!userDoc) {
				res.send({message: "No user found"});
			}
			const userRoleKey = createUserRolesKey(userRoles);
			if (role) userDoc.role = userRoleKey[role];
			if (password) userDoc.password = passwordHash.generate(password);
			const user = await userDoc.save();
			user.role = userRoles.filter(userRole => userRole._id === user.role)[0];
			res.status(201).send({user});
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
};

exports.createNewUser = async (req, res, next) => {
	const { username, role, password, adminPassword, adminUsername } = req.body;
	try {
		const hasPermission = await checkUserAuth(adminUsername, adminPassword);
		if (hasPermission) {
			const usersPromise = Users.find();
			const userRolesPromise = UserRoles.find();
			const userDoc = await usersPromise;
			const userRoles = await userRolesPromise;
			if (userDoc.filter(user => user.username === username).length > 0) {
				next({message: "Username already exists"});
			}
			const userRoleKey = createUserRolesKey(userRoles);
			const user = await Users.create({
				username,
				password: passwordHash.generate(password),
				role: userRoleKey[role]
			});
			user.role = userRoles.filter(userRole => userRole._id === user.role)[0];
			res.status(201).send({user});
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
};