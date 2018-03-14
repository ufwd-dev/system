'use strict';

module.exports = function* getNotificationList(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');

	const notificationList = yield Notification.findAll();
	res.data(notificationList);

	next();
};