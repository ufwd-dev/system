'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const ufwdAccount = sequelize.model('ufwdAccount');

const Administrator = module.exports = sequelize.define('ufwdAdministrator', {
	accountId: {
		type: Sequelize.INTEGER,
		references: {
			model: ufwdAccount,
			key: 'accountId'
		},
		allowNull: false,
		primaryKey: true
	}
});