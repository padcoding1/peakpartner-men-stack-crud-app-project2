// is-signed-in.js

const isSignedIn = (req, res, next) => {
	try {
		if (req.session.user) {
			return next();
		}
		res.redirect("/auth/login");
	} catch (error) {
		console.log("ERROR: isSignedIn", error);
		res.redirect("/");
	}
};

module.exports = isSignedIn;
