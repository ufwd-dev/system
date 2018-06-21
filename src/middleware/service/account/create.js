'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdServiceCreateAccount(req, res, next) {
	const response = {};

	yield res.sequelize.transaction(async function (t) {
		const {name, password} = req.body;
		const {phone, identification} = req.body.ufwd;

		const UfwdAccount = res.sequelize.model('ufwdAccount');
		const Account = res.sequelize.model('account');

		const account = await Account.findOne({
			where: { name }
		});
	
		if (account) {
			throwError('Account has been existed. Try other names.', 403);
		}
	
		const newAccount = await Account.create({
			name, password
		}, {transaction: t});
	
		Account.profile.create({
			accountId: newAccount.id
		}, {transaction: t});

		const _ = require('lodash');
	
		const accountOne = await UfwdAccount.findOne({
			where: { phone }
		});
	
		const accountTwo = await UfwdAccount.findOne({
			where: { identification }
		});
	
		if (accountOne) {
			throwError('The phone is existed. Try other phone.', 403);
		}
	
		if (accountTwo) {
			throwError('The id number is existed. Try other id number.', 403);
		}
	
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