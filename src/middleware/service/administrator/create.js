'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const accountId = req.body.accountId;
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');

	const ufwdAccount = yield UfwdAccount.findOne({
		include: [{
			model: Account,
			where: {
				name: accountId
			}
		}]
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 404);
	}

	const admin = yield UfwdAdministrator.findOrCreate({
		where: {
			accountId: ufwdAccount.accountId
		}
	});

	res.data(admin);

	next();
};