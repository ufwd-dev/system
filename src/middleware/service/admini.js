'use strict';
const { throwError } = require('error-standardize');

module.exports = function isAdminiSignedIn(req, res, next) {
	if (!req.session.accountId) {
		throwError('No account signed in.', 403);
	}

	if (req.session.identify !== 'admini') {
		throwError('You have no permissions.', 403);
	}

	next();
};