const express = require("express");
const router = express.Router();
router.get("/guest", (req, res) => {
	console.log(
		"GUEST ROUTE --> expedition-list.js -- View All Expeditions (No User Data)"
	);
	res.render("expeditions/expedition-list.ejs", {
		user: req.session.user,
	});
});
