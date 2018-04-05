'use strict';

const {throwError} = require('error-standardize');

module.exports = function* serviceSignIn(req, res, next) {
	const account = res.data();
	const Administrator = res.sequelize.model('ufwdAdministrator');

	const administrator = yield Administrator.findOne({
		where: {
			accountId: account.id
		}
	});

	if (!administrator) {
		delete req.session.accountId;

		throwError('You are not administrator', 401);
	}

	req.session.admin = administrator.accountId;

	res.data(account);

	next();
};