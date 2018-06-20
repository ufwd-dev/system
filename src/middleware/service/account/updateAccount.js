'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdUpdateAccount(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const _ = require('lodash');

	const { accountId } = req.params;
	const { name, ufwd } = req.body;

	let newAccount;
	let newUfwdAccount;

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const nameSameAccount = yield Account.findOne({
		where: { name }
	});

	if (!account) {
		throwError('The account is not existed.', 403);
	}

	if (nameSameAccount && nameSameAccount.id !== account.id) {
		throwError('The name has been existed. Try others please.', 403);
	}
	
	if (name) {

		newAccount = yield account.update({ name });
	}

	if (ufwd) {

		const searchOne = yield UfwdAccount.findOne({
			where: {
				phone: ufwd.phone
			} 
		});

		const searchTwo = yield UfwdAccount.findOne({
			where: {
				identification: ufwd.identification
			} 
		});

		if (!ufwdAccount) {
			if (searchOne) {
				throwError('The phone is existed. Try other phone.', 403);
			}
	
			if (searchTwo) {
				throwError('The id number is existed. Try other id number.', 403);
			}

			newUfwdAccount = yield UfwdAccount.create(Object.assign({accountId}, ufwd));
		} else {

			if (searchOne && ufwdAccount.phone !== ufwd.phone) {
				throwError('The phone is existed. Try other phone.', 403);
			}
	
			if (searchTwo && ufwdAccount.identification !== ufwd.identification) {
				throwError('The id number is existed. Try other id number.', 403);
			}
	
			newUfwdAccount = yield ufwdAccount.update(
				ufwd
			);
		}

	}

	const response = {};

	response.name = newAccount ? newAccount.name : account.name;
	response.id = account.id;
	response.ufwd = newUfwdAccount ?  _.pick(newUfwdAccount, [
		'name', 'phone', 'identification', 'party', 'street', 'examine', 'sex', 'unit', 'job', 'created_at'
	]) :  _.pick(ufwdAccount, [
		'name', 'phone', 'identification', 'party', 'street', 'examine', 'sex', 'unit', 'job', 'created_at'
	]);

	res.data(response);

	next();
};