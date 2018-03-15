'use strict';

const { throwError} = require('error-standardize');

module.exports = function* getNotification(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');
	const notificationId = req.params.notificationId;

	const notification = yield Notification.findOne({
		where: {
			id: notificationId
		}
	});

	if (!notification) {
		throwError('The notification is not exist.', 403);
	}

	res.data(notification);

	next();
};