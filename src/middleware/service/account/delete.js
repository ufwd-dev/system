'use strict';

module.exports = function* deleteAccount(req, res, next) {
	const Writer = res.sequelize.model('ufwdWriter');
	const Advise = res.sequelize.model('ufwdAdvise');
	const Subscribe = res.sequelize.model('ufwdSubscribe');
	const Member = res.sequelize.model('ufwdMember');
	const Notification = res.sequelize.model('ufwdNotification');
	const account = res.data();

	yield Writer.destroy({
		where: {
			accountId: account.id
		}
	});

	yield Advise.destroy({
		where: {
			accountId: account.id
		}
	});

	yield Subscribe.destroy({
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