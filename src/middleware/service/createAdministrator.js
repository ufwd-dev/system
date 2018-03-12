'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAdministrator(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const accountId = req.body.accountId;

	const ufwdAccount = yield UfwdAccount.findOne({
		include: [{
			model: Account,
			where: {
				name: accountId
			}
		}]
	});

	if (!ufwdAccount) {
		throwError('Account not exist', 404);
	}

	const admin = yield UfwdAdministrator.findOne({
		where: {
			accountId: ufwdAccount.accountId
		}
	});

	if (admin) {
		throwError('this admini has existed', 403);
	}

	const administrator = yield UfwdAdministrator.create({
		accountId: ufwdAccount.accountId
	});

	res.data(administrator);

	next();
};