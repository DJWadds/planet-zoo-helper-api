const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "userRoles",
		required: true
	}
});

module.exports = mongoose.model("users", UserSchema);