'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAdministrator(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const administratorId = req.params.administratorId;

	const administrator = yield UfwdAdministrator.findOne({
		include: [{
			model: Account
		},
		{
			model: UfwdAccount,
		}],
		where: {
			accountId: administratorId
		}
	});

	if (!administrator) {
		throwError('administrator is not exist.', 404);
	}

	res.data(administrator);

	next();
};