'use strict';

const Sequelize = require('sequelize');

module.exports = function* getAccountList(req, res, next) {
	const _ = require('lodash');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');

	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');
	const Account = res.sequelize.model('account');
	// const administratorId = req.session.admin;

	// const inputor = yield UfwdAdministrator.findOne({
	// 	where: {
	// 		accountId: administratorId
	// 	}
	// });
	
	const {name, examine, username, phone, sex, identification} = req.query;
	const query = {
		include: [{
			model: UfwdAccount
		}]
	};

	name ? (query.where = {}, query.where.name = {[Sequelize.Op.like]: `%${name}%`}) : undefined;

	if (examine || username || phone || sex || identification) {
		query.include[0].where = {};
	}
	
	examine ? (query.include[0].where.examine = examine === 'true' ? true : false) : undefined;

	username ? query.include[0].where.name = { [Sequelize.Op.like]: `%${username}%`} : undefined;

	phone ? query.include[0].where.phone = { [Sequelize.Op.like]: `%${phone}%`} : undefined;

	identification ? query.include[0].where.identification = { [Sequelize.Op.like]: `%${identification}%`} : undefined;

	sex ? (query.where.include[0].sex = sex === 'female' ? 0 : 1) : undefined;

	const accountList = yield Account.findAll(query);

	const administratorList = yield UfwdAdministrator.findAll();

	let mixedAccountList = [];

	const identityLabelList = yield IdentityLabel.findAll();

	accountList.forEach(account => {
		const response = {};

		const ufwd = _.pick(account.ufwdAccount, [
			'name', 'sex', 'examine',
			'phone', 'identification',
			'party', 'street', 'unit', 'job', 'created_at', 'score'
		]);

		response.admin = false;

		response.id = account.id;
		response.name = account.name;

		response.identity = identityLabelList.filter(label => {
			if (label.accountId === account.id) {
				return true;
			}
		}).map(label => label.identityId);

		

		administratorList.forEach(administrator => {
			if (account.id === administrator.accountId) {
				response.admin = true;
			}
		});

		response.ufwd = {};

		if (account.ufwdAccount) {

			response.ufwd = ufwd;
		}
		
		mixedAccountList.push(response);
		
	});

	// if (inputor.transmitter) {
	// 	mixedAccountList = mixedAccountList.filter(account => {
	// 		return account.inputor === administratorId;
	// 	});
	// }

	res.data(mixedAccountList);

	next();
};