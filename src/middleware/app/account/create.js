'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdCreateAccount(req, res, next) {
	const {ufwd} = req.body;
	const account = res.data();
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const _ = require('lodash');
	
	const ufwdAccount = yield UfwdAccount.findOne({
		where: { phone: ufwd.phone }
	});

	if (ufwdAccount) {
		throwError('The phone is existed. Try other phone.', 403);
	}

	const newUfwdAccount = yield UfwdAccount.create(Object.assign({
		accountId: account.id
	}, ufwd));

	const mixedAccount = _.pick(newUfwdAccount, [
		'name', 'sex', 'phone'
	]);

	account.ufwd = mixedAccount;

	res.data(account);

	next();
};