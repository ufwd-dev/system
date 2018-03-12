'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const Account = sequelize.model('account');

const Advise = module.exports = sequelize.define('ufwdAdvise', {
	accountId: {
		type: Sequelize.INTEGER,
		references: {
			model: Account,
			key: 'id'
		},
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});