//routes/user-routes.js (ROUTES: USERS)
const express = require("express");
const router = express.Router();
const users = require("../controllers/user-controller.js");
const methodOverride = require("method-override");

//router.route("/").get(users.userSession);
router.route("/signup").get(users.getSignup).post(users.postSignup); //User GET and POST request

//router.route("/profile/quick").get(users.quick).put(users.createProfile);
router.route("/login").get(users.getLogin).post(users.postLogin);
router.get("/logout", users.getLogout);
//router.route("/profile").get(users.getProfile).post(users.putCreateProfile);
router
	.route("/profile/manage")
	.get(users.getProfile)
	.put(users.putProfile)
	.delete(users.deleteProfile);
router
	.route("/profile")
	.get(users.getCreateProfile)
	.put(users.putCreateProfile); //Since we're actually modifying a user, this is a PUT request
router.route("/").get(users.getHome);

module.exports = router;
