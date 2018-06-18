'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdCreateAccount(req, res, next) {
	const {ufwd} = req.body;

	const Account = res.sequelize.model('account');
	const Profile = Account.profile;

	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const _ = require('lodash');
	
	const account = res.data();
	const profile = yield Profile.findOne({
		where: {
			id: account.id
		}
	});
	
	const accountOne = yield UfwdAccount.findOne({
		where: { phone: ufwd.phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification: ufwd.identification }
	});

	if (accountOne) {
		yield profile.destroy();

		yield account.destroy();

		throwError('The phone is existed. Try other phone.', 403);
	}

	if (accountTwo) {
		yield profile.destroy();

		yield account.destroy();

		throwError('The id number is existed. Try other id number.', 403);
	}

	const newUfwdAccount = yield UfwdAccount.create(Object.assign({
		accountId: account.id
	}, ufwd));

	const mixedAccount = _.pick(newUfwdAccount, [
		'id', 'name', 'sex', 'phone', 'identification'
	]);

	mixedAccount.username = account.name;

	res.data(mixedAccount);

	next();
};