'use strict';

const { throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* createNotification(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');

	let queryText = ' ';

	const { title, content} = req.body;

	let groupList = req.body.groupList;
	let accountList = req.body.accountList;

	groupList ? undefined : groupList = [];
	accountList ? undefined : accountList = [];

	if (groupList.length !== 0 && accountList.length === 0) {

		queryText = queryText + `where ufwd_member.accountId = account.id and ufwd_member.groupId in (${groupList})`;

	} else if (groupList.length === 0 && accountList.length !== 0) {

		queryText = queryText + `where ufwd_member.accountId = account.id or account.id in (${accountList}`;

	} else if (groupList.length !== 0 && accountList.length !== 0) {

		queryText = queryText + `where (ufwd_member.accountId = account.id and ufwd_member.groupId in (${groupList})) or account.id in (${accountList})`;
		
	}

	let list = yield res.sequelize.query(`SELECT account.id from ufwd_member, account ${queryText} group by account.id`, 
		{ type: res.sequelize.QueryTypes.SELECT});

	if (groupList.length === 0 && accountList.length === 0) {
		list = [];
	}

	const notificationList = list.map(account => {
		return {
			receiver: account.id,
			content,
			title
		};
	});

	const notification = yield Notification.bulkCreate(notificationList);

	res.data(notification);

	next();
};