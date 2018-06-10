'use strict';

module.exports = function* validateAccount(req, res, next) {
	const Account = res.sequelize.model('account');
	const { name, phone, identification } = req.query;

	const account = yield Account.findOne({
		where: { name }
	});

	if (account) {

		res.data({
			existed: true
		});

		next();
	}

	const UfwdAccount = res.sequelize.model('ufwdAccount');

	const _ = require('lodash');

	const accountOne = yield UfwdAccount.findOne({
		where: { phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification }
	});

	if (accountOne) {
		res.data({
			existed: true
		});

		next();
	}

	if (accountTwo) {
		res.data({
			existed: true
		});

		next();
	}
	


	
};