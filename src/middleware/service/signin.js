'use strict';

const {throwError} = require('error-standardize');
const {createHash} = require('crypto');

module.exports = function* serviceSignIn(req, res, next) {
	const Account = res.sequelize.model('account');
	const Administrator = res.sequelize.model('ufwdAdministrator');
	const { name,password } = req.body;

	const account = yield Account.findOne({
		where: { name }
	});

	if (!account) {
		throwError('Account is NOT existed', 404);
	}

	const sha256 = createHash('sha256');
	sha256.update(`${account.salt}:${password}`);

	const ciphertext = sha256.digest('hex');

	if (ciphertext !== account.password) {
		throwError('Wrong password.', 401);
	}

	const administrator = yield Administrator.findOne({
		where: {
			accountId: account.id
		}
	});

	if (!administrator) {
		throwError('No Authority', 404);
	}

	req.session.accountId = account.id;
	req.session.identify = 'admini';

	res.data(account);

	next();
};