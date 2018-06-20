'use strict';

module.exports = function* getInformation(req, res, next) {
	const _ = require('lodash');
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const accountId = req.session.accountId;

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const mixAccount = _.pick(account, [
		'id', 'name', 'password', 'created_at'
	]);

	mixAccount.ufwdAccount = ufwdAccount;

	res.data(mixAccount);

	next();
};