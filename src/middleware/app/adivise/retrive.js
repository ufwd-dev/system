'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getOwnAdvise(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	const adviseId = req.params.adviseId;
	const accountId = req.session.accountId;

	const advise = yield Advise.findOne({
		where: {
			id: adviseId,
			accountId
		}
	});

	if (!advise) {
		throwError('The advise is not existed.', 404);
	}

	res.data(advise);

	next();
};