'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getAccountList(req, res, next) {
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const {name, examine, username, phone, sex, identification} = req.query;
	const query = {
		include: [{
			model: Account,
			where: {}
		}],
		where: {}
	};

	name ? query.include[0].where.name = {[Sequelize.Op.like]: `%${name}%`} : undefined;
	
	examine ? (query.where.examine = examine === 'true' ? true : false) : undefined;

	username ? query.where.name = { [Sequelize.Op.like]: `%${username}%`} : undefined;

	phone ? query.where.phone = { [Sequelize.Op.like]: `%${phone}%`} : undefined;

	identification ? query.where.identification = { [Sequelize.Op.like]: `%${identification}%`} : undefined;

	sex ? (query.where.sex = sex === 'female' ? 0 : 1) : undefined;

	const accountList = yield UfwdAccount.findAll(query);

	if (accountList.length === 0) {
		throwError('The account is not exist.', 404);
	}

	res.data(accountList);

	next();
};