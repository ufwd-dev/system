'use strict';

module.exports = function* updateScore(req, res, next) {
	const Account = res.sequelize.model('ufwdAccount');
	const score = req.body.score;
	const accountId = req.session.accountId;

	const account = yield Account.findOne({
		where: {
			accountId
		}
	});

	if (!account.score && account.score !== 0) {
		yield account.update({score});
	}
 
	next();
};