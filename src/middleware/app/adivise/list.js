'use strict';

module.exports = function* getOwnAdviseList(req, res, next) {
	const UfwdAdvise = res.sequelize.model('ufwdAdvise');
	const accountId = req.session.accountId;

	const adviseList = yield UfwdAdvise.findAll({
		where: {
			accountId
		}
	});

	res.data(adviseList);

	next();
};