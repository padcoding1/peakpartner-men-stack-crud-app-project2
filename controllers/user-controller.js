const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user-model");

module.exports.renderHome = (req, res, next) => {
	try {
		console.log(
			"USER CONTROLLER--> renderHome | req.session.user: ",
			req.session.user
		);
		res.render("home.ejs", {
			user: req.session.user,
		});
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> renderHome");
		console.log(error);
		//	res.redirect("/");
	}
};
module.exports.renderLogin = (req, res) => {
	try {
		console.log("USER CONTROLLER--> renderLogin");
		res.render("auth/login.ejs");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> renderLogin");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.renderSignup = (req, res) => {
	try {
		console.log("USER CONTROLLER--> renderSignup");
		console.log("");
		res.render("auth/signup.ejs");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> renderSignup");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.renderCreateProfile = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> renderCreateProfile");
		const userData = await User.findById(req.params._id);
		res.render("auth/create-profile.ejs", { userData });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> renderCreateProfile");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.renderManageProfile = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> renderManageProfile");
		console.log;
		const userData = await User.findById(req.params._id);
		res.render("auth/manage-profile.ejs", { userData });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> renderManageProfile");
		console.log(error);
		res.redirect("/");
	}
};

module.exports.manageProfile = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> manageProfile");
		console.log("");
		const userData = await User.findOne(req.session.user);
		userData.set(req.body);
		await userData.save();

		res.render("auth/manage-profile.ejs", { user: userData });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> manageProfile");
		console.log(error);
		res.redirect("/create-profile");
	}
};
module.exports.userSignup = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> userSignup");
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
		res.render(`auth/create-profile.ejs`, { userData: userInDatabase });
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> userSignup");
		console.log(error);
		res.redirect("/signup");
	}
};
module.exports.createProfile = async (req, res) => {
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
		console.log("ERROR! USER CONTROLLER--> createProfile");
		console.log(error);
		res.redirect("/profile/create-profile");
	}
};

module.exports.userLogin = async (req, res) => {
	try {
		console.log("USER CONTROLLER--> userLogin");
		console.log(req.body);
		const username = req.body.username;
		console.log("const username: ", username);
		const userInDatabase = await User.findOne({ username: username });

		if (!userInDatabase) {
			return res.send(
				"Login failed. Username does not exist. Please try again."
			);
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
		res.redirect("/");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> userLogin");
		console.log(error);
		res.redirect("/");
	}
};
module.exports.userLogout = (req, res) => {
	try {
		console.log("USER CONTROLLER--> userLogout");
		req.session.destroy(); //Logout user
		res.redirect("/");
	} catch (error) {
		console.log("ERROR! USER CONTROLLER--> userLogout");
		console.log(error);
		res.redirect("/");
	}
};
