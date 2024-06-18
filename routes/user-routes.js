//routes/user-routes.js (ROUTES: USERS)
const express = require("express");
const router = express.Router();
const users = require("../controllers/user-controller.js");

//router.route("/").get(users.userSession);
router.route("/signup").get(users.renderSignup).post(users.userSignup); //User GET and POST request

//router.route("/profile/quick").get(users.quick).put(users.createProfile);
router
	.route("/profile/:_id")
	.get(users.renderManageProfile)
	.post(users.manageProfile);
router
	.route("/profile")
	.get(users.renderCreateProfile)
	.put(users.createProfile); //Since we're actually modifying a user, this is a PUT request
router.route("/login").get(users.renderLogin).post(users.userLogin);
router.get("/logout", users.userLogout);

router.route("/").get(users.renderHome);

module.exports = router;
