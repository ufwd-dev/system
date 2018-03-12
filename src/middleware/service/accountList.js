'use strict';

module.exports = function* getAccountList(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const query = {
		include: [{
			model: Account
		}]
	};
	
	if (req.query.examine) {
		const examine = req.query.examine === 'true' ? true : false;

		Object.assign(query, {
			where: { examine }
		});
	}

	const accountList = yield UfwdAccount.findAll(query);
	res.data(accountList);

	next();
};