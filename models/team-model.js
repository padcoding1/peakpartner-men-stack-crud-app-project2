const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
	name: { type: String, required: true },
	instructions: String,
	owner: String,
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	expeditions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expeditions" }],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
