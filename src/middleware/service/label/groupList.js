'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getIdentityLabelList(req, res, next) {
	const accountId = req.params.accountId;

	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');
	const Identity = res.sequelize.model('ufwdIdentity');

	const _ = require('lodash');
	
	const identityLabelList = yield IdentityLabel.findAll({
		where: {
			accountId
		}
	});

	const list = [];

	for (let i = 0; i < identityLabelList.length; i++) {

		const identity = yield Identity.findOne({
			where: {
				id: identityLabelList[i].identityId
			}
		});
	
		list.push(identity.id);
	}

	res.data(list);

	next();
};