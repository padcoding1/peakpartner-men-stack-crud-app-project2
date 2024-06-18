const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	owner: String,
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	first_name: {
		type: String,
		required: false,
	},
	last_name: {
		type: String,
		required: false,
	},
	age: Number,
	gender: String,
	trips_taken: Number,
	experience: String,
	is_leader: {
		type: Boolean,
		default: false,
	},
	trips_led: Number,
	leader_experience: String,
	certifications: String,
	team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
	expeditions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expeditions" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
