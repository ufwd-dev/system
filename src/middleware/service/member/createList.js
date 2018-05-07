'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createMemberList(req, res, next) {
	const {accountId} = req.params;
	const {groupPool} = req.body;

	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Group = res.sequelize.model('ufwdGroup');

	const memberList = [];

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
			
		}
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 403);
	}

	for (let i = 0; i < groupPool.length; i++) {

		const group = yield Group.findOne({
			where: {
				id: groupPool[0]
			}
		});

		if (!group) {
			throwError('The group is not exist.', 403);
		}

		const member = yield Member.findOrCreate({
			where: {
				accountId, group
			}
		});

		memberList.push(member);
	}

	res.data(memberList);

	next();
};