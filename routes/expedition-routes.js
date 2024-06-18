//routes/expedition-routes.js (ROUTES: EXPEDITION)
const express = require("express");
const router = express.Router();
const expeditions = require("../controllers/expedition-controller.js");

router.route("/").get(expeditions.getExpeditions);
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
/*
router
	.route("/")
	.get(campgrounds.index))
	.post(
		isLoggedIn,
		upload.array("image"),
		validateSanitizeCampground,
		campgrounds.createCampground)
	);

router.get("/new", isLoggedIn, campgrounds.newForm);

router
	.route("/:id")
	.get(campgrounds.showCampground))
	.put(
		isLoggedIn,
		upload.array("image"),
		isOwner,
		validateSanitizeCampground,
		campgrounds.editCampground)
	)
	.delete(isLoggedIn, isOwner, campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isOwner, campgrounds.editForm));

module.exports = router;
*/
