'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Administrator = module.exports = sequelize.define('ufwdAdministrator', {
	accountId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	transmitter: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});