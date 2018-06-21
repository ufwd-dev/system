'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccount(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	// const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;
	const _ = require('lodash');

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	// const administrator = yield UfwdAdministrator.findOne({
	// 	where: {
	// 		accountId
	// 	}
	// });

	if (!account) {
		throwError('Account is not existed.', 404);
	}

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const response = {};

	const ufwd = _.pick(ufwdAccount, [
		'name', 'phone', 'identification', 'party', 'street', 'examine', 'sex', 'unit', 'job', 'created_at'
	]);

	// if (administrator) {
	// 	response.admin = true;
	// } else {
	// 	response.admin = false;
	// }
	
	response.name = account.name;
	response.id = account.id;
	response.ufwd = ufwd;

	res.data(response);

	next();
};