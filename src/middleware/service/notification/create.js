'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createNotification(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const { recevierList, content} = req.body;
	const notificationList =[];

	if (recevierList.length === 0) {
		throwError('RecevierList should not be null.', 400);
	}

	for (let i = 0; i < recevierList.length; i++) {

		const ufwdAccount = yield UfwdAccount.findOne({
			where: {
				accountId: recevierList[i]
			}
		});
	
		if (!ufwdAccount) {
			throwError('The account is not exist.', 403);
		}
	
		const notification = yield Notification.create({
			recevier: recevierList[i],
			content
		});
	
		notificationList.push(notification);
	}

	res.data(notificationList);

	next();
};