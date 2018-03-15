'use strict';

module.exports = function* updateOwnPassword(req, res, next) {
	const Account = res.sequelize.model('account');
	const password = req.body.password;
	const accountId = req.session.accountId;

	const account = yield Account.update({
		password
	}, {
		where: {
			id: accountId
		}
	});

	res.data(account);

	next();
};