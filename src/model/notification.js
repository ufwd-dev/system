'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const ufwdAccount = sequelize.model('ufwdAccount');

const Notification = module.exports = sequelize.define('ufwdNotification', {
	recevier: {
		type: Sequelize.INTEGER,
		references: {
			model: ufwdAccount,
			key: 'accountId'
		},
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});