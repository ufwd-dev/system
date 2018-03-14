'use strict';

module.exports = function* deleteAdministrator(req, res, next) {
	const administrator = res.data();
	
	const newAdmini = yield administrator.destroy();

	res.data({
		destroyAdmini: newAdmini
	});

	next();
};