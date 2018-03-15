'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const administratorId = req.params.administratorId;

	const administrator = yield UfwdAdministrator.findOne({
		where: {
			accountId: administratorId
		}
	});

	if (!administrator) {
		throwError('Administrator is not exist.', 404);
	}

	res.data(administrator);

	next();
};