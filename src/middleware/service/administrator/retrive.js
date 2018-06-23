'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const administratorId = req.params.administratorId;
	const accountId = req.params.accountId;

	let queryParams;

	if (administratorId) {
		queryParams = administratorId;
	}

	if (accountId) {
		queryParams = accountId;
	}

	const administrator = yield UfwdAdministrator.findOne({
		where: {
			accountId: queryParams
		}
	});

	if (!administrator) {
		throwError('Administrator is not exist.', 404);
	}

	res.data(administrator);

	next();
};