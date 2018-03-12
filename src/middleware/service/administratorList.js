'use strict';

module.exports = function* getAdministratorList(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const UfwdAccount = res.sequelize.model('ufwdAccount');

	const ufwdAdministratorList = yield UfwdAdministrator.findAll({
		include: [{
			model: UfwdAccount
		}]
	});

	res.data(ufwdAdministratorList);

	next();
};