'use strict';

const { throwError} = require('error-standardize');

const Sequelize = require('sequelize');

module.exports = function* createIdentityLabelList(req, res, next) {
	const {accountId} = req.params;
	const {identityPool} = req.body;

	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Identity = res.sequelize.model('ufwdIdentity');

	const ufwdAccount = yield UfwdAccount.findOne({
		where: {
			accountId
			
		}
	});

	if (!ufwdAccount) {
		throwError('The account is not exist.', 403);
	}

	const identityList = yield Identity.findAll({
		where: {
			id: {
				[Sequelize.Op.in]: identityPool
			}
		}
	});

	const identity = identityList.map(identity => identity.id);

	const accountIdentityList = yield IdentityLabel.findAll({
		where: {
			accountId,
			identityId: {
				[Sequelize.Op.in]: identityPool
			}
		}
	});

	const label = accountIdentityList.map(identity => identity.identityId);

	const identityLabelList = identity.filter(item => {
		if (label.indexOf(item) === -1) {
			return true;
		}
	}).map(item => {
		return {
			accountId,
			identityId: item
		};
	});

	const LabelList = yield IdentityLabel.bulkCreate(identityLabelList);

	res.data(LabelList);

	next();
};