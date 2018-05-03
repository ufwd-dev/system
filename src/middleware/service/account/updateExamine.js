'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateAccountExamine(req, res, next) {
	const examine = req.body.examine;
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const accountId = req.params.accountId;

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});
	
	if (!ufwdAccount) {
		throwError('The account is not exist.', 404);
	}

	const newUfwdAccount = yield ufwdAccount.update({examine});

	res.data(newUfwdAccount);

	next();
};