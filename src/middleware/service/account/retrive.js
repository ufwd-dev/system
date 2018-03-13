'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccount(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;

	const account = yield UfwdAccount.findOne({
		include: [{
			model: Account,
			where: {
				id: accountId
			}
		}],
	});

	if (!account) {
		throwError('Account is not exist', 404);
	}

	res.data(account);

	next();
};