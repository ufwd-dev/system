'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteAccount(req, res, next) {
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});
	
	if (!account) {
		throwError('Account not exist', 404);
	}

	const newAccount = yield account.destroy();

	res.data({
		destroyAccount: newAccount
	});

	next();
};