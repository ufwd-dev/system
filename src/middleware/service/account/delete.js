'use strict';

module.exports = function* deleteAccount(req, res, next) {
	const Advise = res.sequelize.model('ufwdAdvise');
	const Member = res.sequelize.model('ufwdMember');
	const Notification = res.sequelize.model('ufwdNotification');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');
	const account = res.data();

	yield IdentityLabel.destroy({
		where: {
			accountId: account.id
		}
	});

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

	yield Account.profile.destroy({
		where: {
			accountId: account.id
		}
	});

	yield UfwdAccount.destroy({
		where: {
			accountId: account.id
		}
	});

	const result = yield account.destroy();

	res.data({
		destroyAccount: result
	});

	next();
};