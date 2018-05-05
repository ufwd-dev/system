'use strict';

module.exports = function* getInformation(req, res, next) {
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

	account.ufwd = ufwdAccount;

	res.data(account);

	next();
};