'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Notification = module.exports = sequelize.define('ufwdNotification', {
	receiver: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	title: {
		type: Sequelize.STRING
	}
});