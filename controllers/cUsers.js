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

exports.createNewUser = async (req, res, next) => {
	const { user, auth } = req.body;
	try {
		const hasPermission = await checkUserAuth(auth.username, auth.password);
		if (hasPermission) {
			const usersPromise = Users.find();
			const userRolesPromise = UserRoles.find();
			const userDoc = await usersPromise;
			const userRoles = await userRolesPromise;
			if (userDoc.filter(user => user.username === user.username).length > 0) {
				next({message: "Username already exists"});
			}
			const userRoleKey = createUserRolesKey(userRoles);
			const savedUser = await Users.create({
				username: user.username,
				password: passwordHash.generate(user.password),
				role: userRoleKey[user.role]
			});
			savedUser.role = userRoles.filter(userRole => userRole._id === savedUser.role)[0];
			res.status(201).send({user: savedUser});
		}
	} catch (err) {
		res.send({err});
	}
	next({message: "You don't have permission to update users"});
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
	const { user, auth } = req.body;
	const { role, password } = user;
	try {
		const hasPermission = await checkUserAuth(auth.username, auth.password);
		if (hasPermission) {
			const usersPromise = Users.findOne({ username }).populate("role");
			const userRolesPromise = UserRoles.find();
			const userDoc = await usersPromise;
			const userRoles = await userRolesPromise;
			if (!userDoc) {
				res.status(404).send({message: "No user found"});
			}
			const userRoleKey = createUserRolesKey(userRoles);
			if (role) userDoc.role = userRoleKey[role];
			if (password) userDoc.password = passwordHash.generate(password);
			const savedUser = await userDoc.save();
			savedUser.role = userRoles.filter(userRole => userRole._id === savedUser.role)[0];
			res.status(201).send({user: savedUser});
		}
		res.status(403).send({message: "You don't have permission to update users"});
	} catch (err) {
		next({err});
	}
};
