'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdServiceCreateAccount(req, res, next) {
	const {name, password} = req.body;
	const {phone, identification} = req.body.ufwd;
	const _ = require('lodash');

	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');

	const response = {};

	const account = yield Account.findOne({
		where: { name }
	});

	if (account) {
		throwError('Account has been existed. Try other names.', 403);
	}

	const accountOne = yield UfwdAccount.findOne({
		where: { phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification }
	});

	if (accountOne) {
		throwError('The phone is existed. Try other phone.', 403);
	}

	if (accountTwo) {
		throwError('The id number is existed. Try other id number.', 403);
	}

	yield res.sequelize.transaction(async function (t) {
		const newAccount = await Account.create({
			name, password
		}, {transaction: t});
	
		await Account.profile.create({
			accountId: newAccount.id
		}, {transaction: t});

		const newUfwdAccount = await UfwdAccount.create(Object.assign({
			accountId: newAccount.id
		}, req.body.ufwd), {transaction: t});
	
		const ufwd = _.pick(newUfwdAccount, [
			'name', 'phone', 'identification', 'party', 'street', 'examine', 'sex', 'unit', 'job', 'created_at'
		]);
	
		
		response.name = newAccount.name;
		response.id = newAccount.id;
		response.ufwd = ufwd;
	});

	res.data(response);

	next();

};