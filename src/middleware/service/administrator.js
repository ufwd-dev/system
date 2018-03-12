'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const administratorId = req.params.administratorId - 0;

	const administrator = yield UfwdAdministrator.findOne({
		where: {
			accountId: administratorId
		},
		include: [{
			model: UfwdAccount
		}]
	});

	if (!administrator) {
		throwError('administrator is not exist.', 404);
	}

	res.data(administrator);

	next();
};