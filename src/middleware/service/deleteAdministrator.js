'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const administratorId = req.params.administratorId - 0;

	const administrator = yield UfwdAdministrator.findOne({
		where: {
			accountId: administratorId
		}
	});

	if (!administrator) {
		throwError('administrator is not exist.', 404);
	}
	
	administrator.destroy();

	res.data(administrator);

	next();
};