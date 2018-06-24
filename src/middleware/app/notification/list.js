'use strict';

module.exports = function* getOwnNotificationList(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');
	const accountId = req.session.accountId;
	
	const notificationList = yield Notification.findAll({
		where: {
			receiver: accountId
		}
	});

	res.data(notificationList);

	next();
};