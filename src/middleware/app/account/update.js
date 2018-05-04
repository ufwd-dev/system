'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateInformation(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const accountId= req.session.accountId;
	const { name, ufwd } = req.body;
	const result = {};

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

	if (name) {
	
		const nameSameAccount = yield Account.findOne({
			where: { name }
		});

		if (!account) {
			throwError('The account is not existed.', 403);
		}
	
		if (nameSameAccount && nameSameAccount.id !== account.id) {
			throwError('The name has been existed. Try others please.', 403);
		}
		
		yield account.update({ name });
	
		result.username = name;
	}

	if (ufwd) {

		const searchOne = yield UfwdAccount.findOne({
			where: {
				phone: ufwd.phone
			} 
		});

		if (!ufwdAccount) {
			throwError('The account is not existed.', 403);
		}

		if (searchOne && ufwdAccount.phone !== ufwd.phone) {
			throwError('The phone is existed. Try other phone.', 403);
		}

		const searchTwo = yield UfwdAccount.findOne({
			where: {
				identification: ufwd.identification
			} 
		});

		if (searchTwo && ufwdAccount.identification !== ufwd.identification) {
			throwError('The id number is existed. Try other id number.', 403);
		}

		yield ufwdAccount.update(
			ufwd
		);
	
		result.ufwd = ufwd;
	}


	res.data(result);

	next();
};