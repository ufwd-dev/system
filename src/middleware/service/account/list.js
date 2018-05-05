'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getAccountList(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
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

	if (accountList.length === 0) {
		throwError('The account is not exist.', 404);
	}

	res.data(accountList);

	next();
};