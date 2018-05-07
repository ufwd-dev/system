'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const accountId = req.body.accountId;
	const Account = res.sequelize.model('account');

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	if (!account) {
		throwError('The account is not exist.', 404);
	}

	const admin = yield UfwdAdministrator.findOrCreate({
		where: {
			accountId
		}
	});

	res.data(admin);

	next();
};