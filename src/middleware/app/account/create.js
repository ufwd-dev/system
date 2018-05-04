'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdCreateAccount(req, res, next) {
	const {name, password, ufwd} = req.body;
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const _ = require('lodash');
	const Account = res.sequelize.model('account');

	const account = yield Account.findOne({
		where: { name }
	});

	const accountOne = yield UfwdAccount.findOne({
		where: { phone: ufwd.phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification: ufwd.identification }
	});

	if (account) {
		throwError('Account has been existed. Try other names.', 403);
	}


	if (accountOne) {
		throwError('The phone is existed. Try other phone.', 403);
	}

	if (accountTwo) {
		throwError('The id number is existed. Try other id number.', 403);
	}

	const newAccount = yield Account.create({
		name, password
	});

	const newUfwdAccount = yield UfwdAccount.create(Object.assign({
		accountId: newAccount.id
	}, ufwd));

	const mixedAccount = _.pick(newUfwdAccount, [
		'name', 'sex', 'phone', 'identification'
	]);

	mixedAccount.username = newAccount.name;

	res.data(mixedAccount);

	next();
};