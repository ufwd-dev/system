'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getMemberAccount(req, res, next) {
	const {accountId, groupId} = req.params;
	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');

	const member = yield Member.findOne({
		where: {
			accountId, groupId
		},
		include: [{
			model: UfwdAccount,
			where: {
				accountId
			},
			include: [{
				model: Account
			}]
		}]
	});

	if (!member) {
		throwError('member is not exist', 404);
	}

	res.data(member);

	next();
};