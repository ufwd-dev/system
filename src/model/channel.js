'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const Account = sequelize.model('account');

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
		references: {
			model: Account,
			key: 'id'
		},
		allowNull: false
	},
	channelId: {
		type: Sequelize.INTEGER,
		references: {
			model: Channel,
			key: 'id'  
		},
		allowNull: false
	}
});

module.exports = { Channel, Subscribe };