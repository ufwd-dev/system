'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdServiceCreateAccount(req, res, next) {
	const {phone, identification} = req.body.ufwd;
	// const administratorId = req.session.admin;

	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const Profile = Account.profile;


	const _ = require('lodash');
	const account = res.data();

	const profile = yield Profile.findOne({
		where: {
			id: account.id
		}
	});

	const accountOne = yield UfwdAccount.findOne({
		where: { phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification }
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
		accountId: account.id,
		inputor: administratorId
	}, req.body.ufwd));

	const mixedAccount = _.pick(newUfwdAccount, [
		'name', 'sex', 'phone', 'identification', 'created_at'
	]);

	mixedAccount.username = account.name;
	mixedAccount.id = account.id;

	res.data(mixedAccount);

	next();
};