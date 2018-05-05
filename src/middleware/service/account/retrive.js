'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccount(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;
	const _ = require('lodash');

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	if (!account) {
		throwError('Account is not existed.', 404);
	}

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const mixAccount = _.pick(account, [
		'id', 'name', 'password', 'create_at'
	]);

	mixAccount.ufwdAccount = ufwdAccount;

	res.data(mixAccount);

	next();
};