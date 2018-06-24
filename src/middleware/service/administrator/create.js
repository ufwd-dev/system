'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const accountId = req.body.accountId;
	const transmitter = req.body.transmitter;
	const Account = res.sequelize.model('account');

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	const existedAdmin = yield UfwdAdministrator.findOne({
		where: {
			accountId
		}
	});

	if (!account) {
		throwError('The account is not exist.', 404);
	}

	if (existedAdmin) {
		throwError('The administrator has existed.', 403);
	}

	const admin = yield UfwdAdministrator.create({
		accountId, transmitter
	});

	res.data(admin);

	next();
};