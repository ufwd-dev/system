'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateAccount(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;
	const examine = req.body.examine;

	const ufwdAccount = yield UfwdAccount.findOne({
		include: [{
			model: Account,
			where: {
				name: accountId
			}
		}]
	});
	
	if (!ufwdAccount) {
		throwError('Account not exist', 404);
	}

	ufwdAccount.update({examine});

	res.data(ufwdAccount);

	next();
};