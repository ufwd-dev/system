'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdCreateAccount(req, res, next) {
	const {ufwd} = req.body;
	const account = res.data();
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const _ = require('lodash');

	const accountOne = yield UfwdAccount.findOne({
		where: { phone: ufwd.phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification: ufwd.identification }
	});

	if (accountOne) {
		throwError('The phone is existed. Try other phone.', 403);
	}

	if (accountTwo) {
		throwError('The id number is existed. Try other id number.', 403);
	}

	const newUfwdAccount = yield UfwdAccount.create(Object.assign({
		accountId: account.id
	}, ufwd));

	const mixedAccount = _.pick(newUfwdAccount, [
		'name', 'sex', 'phone', 'identification'
	]);

	mixedAccount.username = account.name;

	res.data(mixedAccount);

	next();
};