// is-signed-in.js

const isSignedIn = (req, res) => {
	console.log(
		"MIDDLEWARE--> isSignedIn | req.session.user: ",
		req.session.user
	);
	if (req.session.user) {
		console.log("USER EXISTS, YAY :)");
		console.log(req.session.user);
		//return next();
	}
	res.redirect("/login");
};

module.exports = isSignedIn;
