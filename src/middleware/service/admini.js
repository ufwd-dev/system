'use strict';
const { throwError } = require('error-standardize');

module.exports = function isAdminiSignedIn(req, res, next) {

	if (!req.session.admin) {
		throwError('You have no permissions.', 403);
	}

	next();
};