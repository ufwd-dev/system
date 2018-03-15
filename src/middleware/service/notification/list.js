'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getNotificationList(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');

	const notificationList = yield Notification.findAll({
		where: req.query
	});

	if (notificationList.length === 0) {
		throwError('The group is not exist.', 404);
	}


	res.data(notificationList);

	next();
};