'use strict';

module.exports = function serviceSignout(req, res, next) {
	delete req.session.admin;

	next();
};