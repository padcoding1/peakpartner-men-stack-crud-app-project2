//routes/expedition-routes.js (ROUTES: EXPEDITION)
const express = require("express");
const router = express.Router();
const expeditions = require("../controllers/expedition-controller.js");

//router.route("/").get(expeditions.expeditionSession);
/*
router
	.route("/signup")
	.get(expeditions.renderSignup)
	.post(expeditions.expeditionSignup); //Expedition GET and POST request

//router.route("/profile/quick").get(expeditions.quick).put(expeditions.createProfile);
router
	.route("/profile/:_id")
	.get(expeditions.renderManageProfile)
	.post(expeditions.manageProfile);
router
	.route("/profile")
	.get(expeditions.renderCreateProfile)
	.put(expeditions.createProfile); //Since we're actually modifying a expedition, this is a PUT request
router
	.route("/login")
	.get(expeditions.renderLogin)
	.post(expeditions.expeditionLogin);
router.get("/logout", expeditions.expeditionLogout);

router.route("/").get(expeditions.renderHome);
*/
module.exports = router;

////////////////////////
