'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createMember(req, res, next) {
	const {accountId, groupId} = req.params;
	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Group = res.sequelize.model('ufwdGroup');

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const group = yield Group.findOne({
		where: {
			id: groupId
		}
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 403);
	}

	if (!group) {
		throwError('The group is not exist.', 403);
	}

	const member = yield Member.findOrCreate({
		where: {
			accountId, groupId
		}
	});

	res.data(member);

	next();
};