'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updatePassword(req, res, next) {
	const password = req.body.password;
	const Account = res.sequelize.model('account');
	const { accountId } = req.params;

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	if (!account) {
		throwError('The account is not existed.', 403);
	}

	const result = yield account.update({
		password
	});

	res.data(result);
	
	next();
};