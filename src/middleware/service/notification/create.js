'use strict';

const { throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* createNotification(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');
	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Group = res.sequelize.model('ufwdGroup');

	const { groupList, accountList, content} = req.body;

	for (let i = 0; i < groupList.length; i++) {
		const groupInstance = yield Group.findOne({
			where: {
				id: groupList[i]
			}
		});
	
		if (!groupInstance) {
			throwError('The group is not existed.', 404);
		}
	}

	for (let i = 0; i < accountList.length; i++) {

		const accountInstance = yield UfwdAccount.findOne({
			where: {
				accountId: accountList[i]
			}
		});
		
		if (!accountInstance) {
			throwError('The account is not existed.', 404);
		}
	}

	const memberList = yield Member.findAll({
		where: {
			groupId: {
				[Sequelize.Op.or]: groupList
			}
		}
	});

	const recevierList = [];

	memberList.forEach(member => {
		if (recevierList.indexOf(member.accountId) === -1) {
			recevierList.push(member.accountId);
		}
	});

	accountList.forEach(account => {
		if (recevierList.indexOf(account) === -1) {
			recevierList.push(account);
		}
	});


	const notificationList = recevierList.map(recevier => {
		return {
			recevier, content
		};
	});

	const notification = yield Notification.bulkCreate(notificationList);

	res.data(notification);

	next();
};