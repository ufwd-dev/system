'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getIdentityLabelList(req, res, next) {
	const accountId = req.params.accountId;

	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');
	const Identity = res.sequelize.model('ufwdIdentity');

	const _ = require('lodash');
	
	const identityList = yield Identity.findAll({
		include: [{
			model: IdentityLabel,
			where: {
				accountId
			}
		}]
	});

	const list = identityList.map(identity => identity.id);

	res.data(list);

	next();
};