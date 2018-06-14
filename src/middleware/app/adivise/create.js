'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAdvise(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	const { content, title, category } = req.body;
	const accountId = req.session.accountId;
	const UfwdAccount = res.sequelize.model('ufwdAccount');

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	if (!ufwdAccount && !ufwdAccount.examine) {
		throwError('No permission', 403);
	}

	const advise = yield Advise.create({
		accountId, content, title, category
	});

	res.data(advise);

	next();
};