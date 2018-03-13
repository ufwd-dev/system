'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const accountId = req.body.accountId;

	const admin = yield UfwdAdministrator.findOne({
		where: {
			accountId: accountId
		}
	});

	if (admin) {
		throwError('this admini has existed', 403);
	}

	const administrator = yield UfwdAdministrator.create({
		accountId: accountId
	});

	res.data(administrator);

	next();
};