'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdServiceCreateAccount(req, res, next) {
	const {phone, identification} = req.body.ufwd;
	const administratorId = req.session.admin;

	const UfwdAccount = res.sequelize.model('ufwdAccount');

	const _ = require('lodash');
	const account = res.data();

	const accountOne = yield UfwdAccount.findOne({
		where: { phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification }
	});

	const ufwdAccount = yield UfwdAccount.create({
		accountId: account.id,
		inputor: administratorId
	});

	if (accountOne) {
		throwError('The phone is existed. Try other phone.', 403);
	}

	if (accountTwo) {
		throwError('The id number is existed. Try other id number.', 403);
	}

	const newUfwdAccount = yield ufwdAccount.update(req.body.ufwd);

	const mixedAccount = _.pick(newUfwdAccount, [
		'name', 'sex', 'phone', 'identification', 'created_at'
	]);

	mixedAccount.username = account.name;
	mixedAccount.id = account.id;

	res.data(mixedAccount);

	next();
};