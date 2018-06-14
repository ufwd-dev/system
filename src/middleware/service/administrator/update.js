'use strict';

module.exports = function* updateAdministrator(req, res, next) {
	const administrator = res.data();

	const newAdminstrator = yield administrator.update(req.body);

	res.data(newAdminstrator);

	next();
};