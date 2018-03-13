'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createWriter(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdWriter = res.sequelize.model('ufwdWriter');
	const accountId = req.body.accountId;

	const ufwdAccount = yield UfwdAccount.findOne({
		include: [{
			model: Account,
			where: {
				name: accountId
			}
		}]
	});

	if (!ufwdAccount) {
		throwError('the account is not exist.', 404);
	}

	const writer = yield UfwdWriter.findOne({
		where: {
			accountId: ufwdAccount.accountId
		}
	});

	if (writer) {
		throwError('the writer is existed.', 403);
	}

	const newWriter = yield UfwdWriter.create({
		accountId: ufwdAccount.accountId
	});

	res.data(newWriter);
	
	next();
};