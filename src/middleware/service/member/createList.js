'use strict';

const { throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* createMemberList(req, res, next) {
	const {accountId} = req.params;
	const {groupPool} = req.body;

	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Group = res.sequelize.model('ufwdGroup');

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
			
		}
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 403);
	}

	const groupList = yield Group.findAll({
		where: {
			id: {
				[Sequelize.Op.in]: groupPool
			}
		}
	});

	const group = groupList.map(group => group.id);

	const accountMemberList = yield Member.findAll({
		where: {
			accountId,
			groupId: {
				[Sequelize.Op.in]: groupPool
			}
		}
	});

	const member = accountMemberList.map(member => member.groupId);

	const list = group.filter(item => {
		if (member.indexOf(item) === -1) {
			return true;
		}
	}).map(item => {
		return {
			accountId,
			groupId: item
		};
	});

	const memberList = yield Member.bulkCreate(list);

	res.data(memberList);

	next();
};