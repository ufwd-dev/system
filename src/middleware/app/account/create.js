'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createAccount(req, res, next) {
	const {name, password, ufwd} = req.body;
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');

	const account = yield Account.findOne({
		where: { name }
	});

	if (account) {
		throwError('Account has been existed. Try other names.', 403);
	}

	const newAccount = yield Account.create({
		name, password
	});
	
	const ufwdAccount = yield UfwdAccount.findOne({
		where: { phone: ufwd.phone }
	});

	if (ufwdAccount) {
		throwError('The phone is existed. Try other phone.', 403);
	}

	const newUfwdAccount = yield UfwdAccount.create(Object.assign({
		accountId: newAccount.id
	}, ufwd));

	res.data({
		account: newAccount, 
		ufwdAccount:newUfwdAccount
	});

	next();
};