'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createNotification(req, res, next) {
	const Notification = res.sequelize.model('ufwdNotification');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const { recevier, content} = req.body;

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId: recevier
		}
	});

	if (!ufwdAccount) {
		throwError('the account is not exist.', 403);
	}
	
	const notification = yield Notification.findOrCreate({
		where: {
			recevier, content
		}
	});

	res.data(notification);

	next();
};