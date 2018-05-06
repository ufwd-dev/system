'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccount(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;
	const _ = require('lodash');

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	const administrator = yield UfwdAdministrator.findOne({
		where: {
			accountId
		}
	});

	if (!account) {
		throwError('Account is not existed.', 404);
	}

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const mixAccount = _.pick(ufwdAccount, [
		'name', 'phone', 'identification', 'party', 'street', 'examine'
	]);

	if (administrator) {
		mixAccount.admin = true;
	} else {
		mixAccount.admin = false;
	}
	
	mixAccount.username = account.name;
	mixAccount.id = account.id;
	mixAccount.create_at = account['create_at'];

	res.data(mixAccount);

	next();
};