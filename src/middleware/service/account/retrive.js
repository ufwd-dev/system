'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccount(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;

	const account = yield Account.findOne({
		include: [{
			model: UfwdAccount,
			where: {
				accountId
			}
		}],
	});

	if (!account) {
		throwError('Account is not existed.', 404);
	}

	res.data(account);

	next();
};