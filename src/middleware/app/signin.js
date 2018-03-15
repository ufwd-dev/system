'use strict';

const {throwError} = require('error-standardize');
const { createHash } = require('crypto');

module.exports = function* signIn(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const { name, password, phone} = req.body;
	const query = {
		where: {},
		include: [{
			model: UfwdAccount,
			where: {
				examine: true
			}
		}]
	};

	if (!name && !phone) {
		throwError('You need input name or phone.', 403);
	}

	name ? (query.where.name = name) : undefined;
	phone ? (query.include[0].where.phone = phone) : undefined;

	const account = yield Account.findOne(query);

	if (!account) {
		throwError('Account is NOT existed.', 404);
	}

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