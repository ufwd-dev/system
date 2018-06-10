'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createIdentityLabel(req, res, next) {
	const {accountId, identityId} = req.params;
	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Identity = res.sequelize.model('ufwdIdentity');

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
		}
	});

	const identity = yield Identity.findOne({
		where: {
			id: identityId
		}
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 403);
	}

	if (!identity) {
		throwError('The identity is not exist.', 403);
	}

	const identityLabel = yield IdentityLabel.findOrCreate({
		where: {
			accountId, identityId
		}
	});

	res.data(identityLabel);

	next();
};