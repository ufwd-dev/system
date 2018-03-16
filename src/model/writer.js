'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const ufwdAccount = sequelize.model('ufwdAccount');
const Channel = sequelize.model('ufwdChannel');

const Writer = module.exports = sequelize.define('ufwdWriter', {
	accountId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	channelId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
}, {
	paranoid: true
});