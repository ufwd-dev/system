'use strict';

const {throwError} = require('error-standardize');
const { createHash } = require('crypto');

module.exports = function* signIn(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const { name, password } = req.body;
	let accountId;

	const accountOne = yield Account.findOne({
		include: [{
			model: UfwdAccount,
			where: {
				examine: true
			}
		}],
		where: {
			name
		}
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: {
			phone: name,
			examine: true
		}
	});

	const accountThree = yield UfwdAccount.findOne({
		where: {
			identification: name,
			examine: true
		}
	});

	if (!accountOne && !accountTwo && !accountThree) {
		throwError('Account is NOT existed.', 404);
	}

	if (accountOne) {
		accountId = accountOne.id;
	}

	if (accountTwo) {
		accountId = accountTwo.accountId;
	}

	if (accountThree) {
		accountId = accountThree.accountId;
	}

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	const sha256 = createHash('sha256');
	sha256.update(`${account.salt}:${password}`);
	
	const ciphertext = sha256.digest('hex');

	if (ciphertext !== account.password) {
		throwError('Wrong password.', 401);
	}
	
	req.session.accountId = account.id;

	res.data(account);

	next();
};