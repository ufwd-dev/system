'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getMemberAccount(req, res, next) {
	const {accountId, groupId} = req.params;

	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');

	const _ = require('lodash');

	const member = yield Member.findOne({
		where: {
			accountId, groupId
		}
	});

	if (!member) {
		throwError('Member is not exist', 404);
	}

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	const mixedAccount = _.pick(ufwdAccount, [
		'name', 'phone', 'party', 'street'
	]);

	mixedAccount.username = account.name;

	res.data(mixedAccount);

	next();
};