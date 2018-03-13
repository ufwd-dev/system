'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteAdministrator(req, res, next) {
	const administrator = res.data();

	if (!administrator) {
		throwError('administrator is not exist.', 404);
	}
	
	const newAdmini = yield administrator.destroy();

	res.data({
		destroyAdmini: newAdmini
	});

	next();
};