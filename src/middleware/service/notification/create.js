'use strict';

const { throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* createNotification(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');

	const { groupList, accountList, content} = req.body;

	const list = yield res.sequelize.query(`SELECT account.id from ufwd_member, account where (ufwd_member.accountId = account.id and ufwd_member.groupId in (${groupList})) or account.id in (${accountList}) group by account.id`, 
		{ type: res.sequelize.QueryTypes.SELECT});

	const notificationList = list.map(account => {
		return {
			receiver: account.id,
			content
		};
	});

	const notification = yield Notification.bulkCreate(notificationList);

	res.data(notification);

	next();
};