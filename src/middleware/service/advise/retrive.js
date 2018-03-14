'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getAdvise(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	const adviseId = req.params.adviseId;

	const advise = yield Advise.findOne({
		where: {
			id: adviseId
		}
	});

	if (!advise) {
		throwError('The advise is not existed', 404);
	}

	res.data(advise);

	next();
};