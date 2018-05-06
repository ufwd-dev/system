'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getRealAccount(req, res, next) {
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	if (!account) {
		throwError('Account is not existed.', 404);
	}

	res.data(account);

	next();
};