'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getAccountList(req, res, next) {
	const _ = require('lodash');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const UfwdAdministrator = res.sequelize.model('ufwdAdministrator');
	const Account = res.sequelize.model('account');
	const Street = res.sequelize.model('ufwdStreet');
	const Party = res.sequelize.model('ufwdParty');

	const administratorId = req.session.admin;

	const inputor = yield UfwdAdministrator.findOne({
		where: {
			accountId: administratorId
		}
	});
	
	const {name, examine, username, phone, sex, identification} = req.query;
	const query = {
		include: [{
			model: UfwdAccount,
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

	const partyList = yield Party.findAll();

	const streetList = yield Street.findAll();

	let mixedAccountList = [];

	accountList.forEach(account => {
		const mixAccount = _.pick(account.ufwdAccount, [
			'name', 'sex', 'examine',
			'phone', 'identification',
			'party', 'street', 'created_at'
		]);

		mixAccount.admin = false;

		mixAccount.id = account.id;
		mixAccount.username = account.name;

		administratorList.forEach(administrator => {
			if (account.id === administrator.accountId) {
				mixAccount.admin = true;
			}
		});

		if (account.ufwdAccount) {
	
			partyList.forEach(party => {
				if (account.ufwdAccount.party === party.id) {
					mixAccount.party = party.name;
				}
			});
	
			streetList.forEach(street => {
				if (account.ufwdAccount.street === street.id) {
					mixAccount.street = street.name;
				}
			});
		}
		
		mixedAccountList.push(mixAccount);
		
	});

	// if (inputor.transmitter) {
	// 	mixedAccountList = mixedAccountList.filter(account => {
	// 		return account.inputor === administratorId;
	// 	});
	// }

	res.data(mixedAccountList);

	next();
};