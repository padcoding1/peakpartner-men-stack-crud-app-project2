//pass-user-to-view.js

const passUserToView = (req, res, next) => {
	res.locals.user = req.session.user ? req.session.user : false;
	next();
};

module.exports = passUserToView;
