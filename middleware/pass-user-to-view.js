//pass-user-to-view.js

const passUserToView = (req, res, next) => {
	console.log("");
	console.log(
		"MIDDLEWARE--> passUserToView | req.session.user: ",
		req.session.user
	);
	console.log("");
	res.locals.user = req.session.user ? req.session.user : false;
	next();
};

module.exports = passUserToView;
