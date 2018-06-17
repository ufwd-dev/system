'use strict';

module.exports = function* updateOwnPassword(req, res, next) {
	const Account = res.sequelize.model('account');
	const password = req.body.password;
	const accountId = req.session.accountId;

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});
	
	const newAccount = yield account.update({password});

	res.data(newAccount);
 
	next();
};