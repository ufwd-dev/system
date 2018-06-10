'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createIdentityLabelList(req, res, next) {
	const {accountId} = req.params;
	const {identityPool} = req.body;

	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Identity = res.sequelize.model('ufwdIdentity');

	const IdentityLabelList = [];

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
			
		}
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 403);
	}

	for (let i = 0; i < identityPool.length; i++) {

		const identity = yield Identity.findOne({
			where: {
				id: identityPool[i]
			}
		});

		if (!identity) {
			throwError('The identity is not exist.', 403);
		}

		const identityLabel = yield IdentityLabel.findOrCreate({
			where: {
				accountId, 
				identityId: identity.id
			}
		});

		IdentityLabelList.push(identityLabel);
	}

	res.data(IdentityLabelList);

	next();
};