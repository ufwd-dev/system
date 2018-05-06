'use strict';

module.exports = function* deleteAccount(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	const Member = res.sequelize.model('ufwdMember');
	const Notification = res.sequelize.model('ufwdNotification');
	const account = res.data();

	yield Advise.destroy({
		where: {
			accountId: account.id
		}
	});

	yield Member.destroy({
		where: {
			accountId: account.id
		}
	});

	yield Notification.destroy({
		where: {
			recevier: account.id
		}
	});

	const result = yield account.destroy();

	res.data({
		destroyAccount: result
	});

	next();
};