'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getOwnNotification(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');
	const accountId = req.session.accountId;
	const notificationId = req.params.notificationId;

	const notification = yield Notification.findOne({
		where: {
			id: notificationId,
			receiver: accountId
		}
	});

	if (!notification) {
		throwError('The notification is not existed', 404);
	}

	res.data(notification);

	next();
};