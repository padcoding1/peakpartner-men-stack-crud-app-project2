const express = require("express");
const Model = require("../models/index.js");

module.exports.getExpeditions = async (req, res) => {
	try {
		console.log("EXPEDITION CONTROLLER--> getExpeditions");
		console.log("params: ", req.params._id);
		console.log("req.session.user: ", req.session.user);
		const allExpeditions = await Model.find({});
		res.render("expeditions/expeditions-list.ejs", { allExpeditions });
	} catch (error) {
		console.log("ERROR! EXPEDITION CONTROLLER--> getExpeditions");
		console.log(error);
		res.redirect("/");
	}
};

module.exports.getNewExpedition = async (req, res) => {
	console.log("router get recipes/OGnew.ejs");
	try {
		const allExpeditions = await Model.find({});
		res.render("expeditions/new.ejs", { allExpeditions });
	} catch (error) {
		console.log("ERROR: get /new", error);
		res.redirect("/recipes");
	}
};
