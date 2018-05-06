'use strict';

module.exports = function* getAdministratorList(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');

	const administratorList = yield UfwdAdministrator.findAll();

	res.data(administratorList);

	next();
};