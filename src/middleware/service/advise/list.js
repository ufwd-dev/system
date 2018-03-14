'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getAdviseList(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	
	const adviseList = yield Advise.findAll({
		where: req.query
	});

	if (!adviseList.length) {
		throwError('The advise is not existed', 404);
	}

	res.data(adviseList);

	next();
};