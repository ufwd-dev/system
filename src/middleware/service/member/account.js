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

	const response = {};

	const ufwd = _.pick(ufwdAccount, [
		'name', 'phone', 'identification', 'party', 'street', 'examine', 'sex', 'unit', 'job', 'created_at'
	]);

	response.name = account.name;
	response.id = account.id;
	response.ufwd = ufwd;

	res.data(response);

	next();
};