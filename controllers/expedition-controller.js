const express = require("express");
const User = require("../models/user-model.js");
const Expedition = require("../models/expedition-model.js");
const Model = require("../models/index.js");
module.exports.getExpeditions = async (req, res) => {
	try {
		console.log("EXPEDITION CONTROLLER--> getExpeditions");
		console.log("params: ", req.params._id);
		console.log("req.session.user: ", req.session.user);
		const currentUser = await User.findById(req.session.user._id).populate(
			"expeditions"
		);
		res.render("expeditions/expeditions-list.ejs", {
			expeditions: currentUser.expeditions,
		});
	} catch (error) {
		console.log("ERROR! EXPEDITION CONTROLLER--> getExpeditions");
		console.log(error);
		res.redirect("/");
	}
};

module.exports.getNewExpedition = async (req, res) => {
	console.log("EXPEDITION CONTROLLER--> getNewExpedition");
	try {
		const allExpeditions = await Model.find({});
		res.render("expeditions/new.ejs", { allExpeditions });
	} catch (error) {
		console.log("ERROR: get /new", error);
		res.redirect("/expedition");
	}
};

module.exports.postNewExpedition = async (req, res) => {
	console.log("EXPEDITION CONTROLLER--> postNewExpedition");
	try {
		const newExpedition = await Expedition.create(req.body);
		const currentUser = await User.findById(req.session.user._id);
		currentUser.expeditions.push(newExpedition._id);
		await currentUser.save();
		res.redirect(`/users/${currentUser._id}/expedition`);
	} catch (error) {
		console.log("ERROR: get /new", error);
		res.redirect("/expeditions");
	}
};
