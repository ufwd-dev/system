'use strict';

module.exports = function* createAdvise(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	const { content } = req.body;
	const accountId = req.session.accountId;

	const advise = yield Advise.create({
		accountId, content
	});

	res.data(advise);

	next();
};