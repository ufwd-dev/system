'use strict';

module.exports = function* getAdministratorList(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const UfwdAccount = res.sequelize.model('ufwdAccount');

	const administratorList = yield UfwdAdministrator.findAll({
		include: [{
			model: UfwdAccount
		},{
			model: Account
		}]
	});
	res.data(administratorList);

	next();
};