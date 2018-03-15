'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAdministratorList(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');

	const administratorList = yield UfwdAdministrator.findAll();

	if (administratorList.length === 0) {
		throwError('The administrator is not exist.', 404);
	}

	res.data(administratorList);

	next();
};