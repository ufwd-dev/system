'use strict';

module.exports = function* getAdviseList(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	
	const adviseList = yield Advise.findAll({
		where: req.query
	});

	res.data(adviseList);

	next();
};