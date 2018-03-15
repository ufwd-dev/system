'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateInformation(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const accountId = req.session.accountId;
	const { name, ufwd } = req.body;
	const result = {};

	if (name) {
		const oldAccount = yield Account.findOne({
			where: {
				name
			}
		});

		if (oldAccount) {
			throwError('The account is existed.', 403);
		}

		const account = yield Account.update(
			{
				name
			},
			{
				where: {
					id: accountId
				}
			}
		);

		result.account = account;
	}

	if (ufwd) {

		if (ufwd.phone) {
			const search = yield UfwdAccount.findOne({
				where: {
					phone: ufwd.phone
				} 
			});

			if (search) {
				throwError('The phone is exist.', 403);
			}
		}

		const ufwdAccount = yield UfwdAccount.update(
			ufwd,
			{
				where: {
					accountId
				}
			}
		);

		result.ufwdAccount = ufwdAccount;
	}

	res.data(result);

	next();
};