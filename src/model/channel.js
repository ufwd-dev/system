'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const ufwdAccount = sequelize.model('ufwdAccount');

const Channel = sequelize.define('ufwdChannel', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

const Subscribe = sequelize.define('ufwdSubscribe', {
	accountId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	channelId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = { Channel, Subscribe };