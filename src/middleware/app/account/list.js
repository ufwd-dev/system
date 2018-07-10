'use strict';

const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = function* getVip(req, res, next) {
	const {keyword, party, street, identity, accountId} = req.query;

	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');

	let resData;

	const query = {
		where: {}
	};

	keyword ? query.where.name = {[Sequelize.Op.like]: `%${keyword}%`} : undefined;


	party ? query.where.party = party : undefined;

	street ? query.where.street = street : undefined;

	identity ? query.include = [{
		model: IdentityLabel,
		where: {
			identityId: identity
		}
	}] : undefined;

	const accountList = yield UfwdAccount.findAll(query);

	resData = accountList.map(account => {
		const item = {};

		item.accountId = account.accountId;
		item.name = account.name;
		item.phone = account.phone;

		return item;
	});

	if (accountId) {

		const account = yield UfwdAccount.findOne({
			where: {
				accountId
			},
			include: [{
				model: IdentityLabel
			}]
		});

		if (account) {
			resData = _.pick(account, ['name', 'party', 'street', 'sex', 'job', 'unit', 'phone']);

			resData.identityList = account.ufwdIdentityLabels.map(identity => identity.identityId);
		}

	}

	res.data(resData);

	next();
};