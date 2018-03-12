'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const Account = sequelize.model('account');

const Administrator = module.exports = sequelize.define('ufwdAdministrator', {
	accountId: {
		type: Sequelize.INTEGER,
		references: {
			model: Account,
			key: 'id'
		},
		allowNull: false,
		primaryKey: true
	}
});