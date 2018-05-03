'use strict';

const {throwError} = require('error-standardize');

module.exports = function* ufwdUpdateAccount(req, res, next) {
	const {ufwd} = req.body;
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const account = res.data();

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId: account.id
		}
	});

	const accountOne = yield UfwdAccount.findOne({
		where: { phone: ufwd.phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification: ufwd.identification }
	});

	if (accountOne && ufwdAccount.phone !== ufwd.phone) {
		throwError('The phone is existed. Try other phone.', 403);
	}

	if (accountTwo && ufwdAccount.identification !== ufwd.identification) {
		throwError('The id number is existed. Try other id number.', 403);
	}

	const newUfwdAccount = yield ufwdAccount.update(ufwd);

	res.data(newUfwdAccount);

	next();
};