'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updatePassword(req, res, next) {
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;
	const password = req.body.password;

	const account = yield Account.findOne({
		where: {
			name: accountId
		}
	});

	if (!account) {
		throwError('Account not exist', 404);
	}

	account.update({
		password
	});

	res.data(account);
	
	next();
};