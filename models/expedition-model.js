const mongoose = require("mongoose");

const expeditionSchema = new mongoose.Schema({
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
});

const Expedition = mongoose.model("Expedition", expeditionSchema);
module.exports = Expedition;
