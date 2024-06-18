const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user-model.js");

module.exports.getHome = (req, res, next) => {
	try {
		console.log(
			"USER CONTROLLER--> getHome | req.session.user: ",
			req.session.user
		);
		res.render("home.ejs", {
			user: req.session.user,
		});
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> getHome");
		console.log(error);
		//	res.redirect("/");
	}
};
module.exports.getLogin = (req, res) => {
	try {
		console.log("USER CONTROLLER--> getLogin");
		res.render("auth/login.ejs");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> getLogin");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.getSignup = (req, res) => {
	try {
		console.log("USER CONTROLLER--> getSignup");
		console.log("");
		res.render("auth/signup.ejs");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> getSignup");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.getCreateProfile = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> getCreateProfile");
		const userData = await User.findById(req.params._id);
		res.render("auth/create-profile.ejs", { userData });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> getCreateProfile");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.getProfile = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> getProfile");
		console.log;
		const userData = await User.findOne(req.params._id);
		console.log("userdata: ", userData);
		res.render("auth/manage-profile.ejs", { userData });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> getProfile");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.putCreateProfile = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> createProfile");
		console.log("-----");
		console.log("REQ.session.user: ", req.body.owner);
		console.log("REQ.SESSIONID: ", req.sessionID);
		console.log("REQ.SESSION.USER.USERNAME: ", req.session.user.username);
		console.log("REQ.SESSION.USER._ID: ", req.session.user._id);
		console.log("");
		console.log("REQ.userData: ", req.userData);
		console.log("---req.session.user: ", req.body);
		const userData = await User.findOne({
			username: req.session.user.username,
		});
		console.log("userData: ", userData);
		userData.set(req.body);
		await userData.save();
		console.log("");
		console.log("userData: ", userData);
		console.log("");
		res.redirect("/");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> putCreateProfile");
		console.log(error);
		res.redirect("/profile/create-profile");
	}
};
module.exports.putProfile = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> putProfile");
		console.log("");
		const userData = await User.findOne(req.session.user);
		userData.set(req.body);
		await userData.save();

		res.render("auth/manage-profile.ejs", { user: userData });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> putProfile");
		console.log(error);
		res.redirect("/create-profile");
	}
};
module.exports.postLogin = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> postLogin");
		console.log(req.body);
		const username = req.body.username;
		console.log("const username: ", username);
		const userInDatabase = await User.findOne({ username: username });

		if (!userInDatabase) {
			res.redirect("/auth/login");
		}
		// There is a user! Time to test their password with bcrypt
		const validPassword = bcrypt.compareSync(
			req.body.password,
			userInDatabase.password
		);
		if (!validPassword) {
			return res.send("Login failed. Incorrect Password. Please try again.");
		}

		// There is a user AND they had the correct password. Time to make a session!
		// Avoid storing the password, even in hashed format, in the session
		// If there is other data you want to save to `req.session.user`, do so here!
		req.session.user = {
			username: userInDatabase.username,
			_id: userInDatabase._id,
		};
		console.log("REDIRECTION TO /  (home)");
		res.redirect("/");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> postLogin");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.postSignup = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> postSignup");
		console.log("");
		//Trim the email and username for spaces
		const email = req.body.email;
		const username = req.body.username;

		//Check if a valid email address format
		if (!validator.isEmail(email)) {
			return res.send("Invalid email address.");
		}

		// Check if the email is already taken
		const emailInDatabase = await User.findOne({
			email: email,
		});
		if (emailInDatabase) {
			return res.send("This email has already been used to sign up.");
		}
		// Check if the username is already taken
		var userInDatabase = await User.findOne({
			username: req.body.username,
			if(userInDatabase) {
				return res.send("Username already taken.");
			},
		});
		// Check if the password and confirm-password match
		if (req.body.password !== req.body.confirmPassword) {
			return res.send("Password and Confirm Password must match");
		}

		// Must hash the password before sending to the database
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);
		req.body.password = hashedPassword;

		// All ready to create the new user
		await User.create(req.body);

		userInDatabase = await User.findOne({ username: username });
		req.session.user = {
			username: userInDatabase.username,
			_id: userInDatabase._id,
		};
		console.log("!!!!!!!!!USER CREATED!!!!!!!!!");
		console.log(userInDatabase);
		console.log("!!!!!!!!!USER CREATED!!!!!!!!!");
		//Redirect to the create profile page
		console.log("RENDERING CREATE PROFILE.EJS");
		res.render(`auth/create-profile.ejs`, { userData: userInDatabase });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> postSignup");
		console.log(error);
		res.redirect("/signup");
	}
};
module.exports.deleteProfile = async (req, res) => {
	try {
		await Recipe.findByIdAndDelete(req.params._id);
		res.redirect("/");
		console.log("redirecting to /recipes/");
	} catch (error) {
		console.log("ERROR: delete /:id", error);
		res.redirect("/recipes");
	}
};

module.exports.getLogout = (req, res) => {
	try {
		console.log("USER CONTROLLER--> getLogout");
		req.session.destroy(); //Logout user
		res.redirect("/");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> getLogout");
		console.log(error);
		res.redirect("/");
	}
};
