'use strict';

module.exports = function* deleteOwnNotification(req, res, next) {
	const notification = res.data();

	const result = yield notification.destroy();
	res.data({
		destroyed: result
	});

	next();
};