'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteAccount(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;
	
	const ufwdAccount = yield UfwdAccount.findOne({
		include: [{
			model: Account,
			where: {
				name: accountId
			}
		}]
	});

	const account = yield Account.findOne({
		where: {
			name: accountId
		}
	});
	
	if (!account) {
		throwError('Account not exist', 404);
	}

	ufwdAccount.destroy();
	account.destroy();

	res.data(account);

	next();
};