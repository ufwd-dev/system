'use strict';

module.exports = function* createAdministrator(req, res, next) {
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const accountId = req.body.accountId;

	const admin = yield UfwdAdministrator.findOrCreate({
		where: {
			accountId: accountId
		}
	});

	res.data(admin);

	next();
};