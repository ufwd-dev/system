'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const ufwdAccount = sequelize.model('ufwdAccount');

const Group = sequelize.define('ufwdGroup', {
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

const Member = sequelize.define('ufwdMember', {
	accountId: {
		type: Sequelize.INTEGER,
		references: {
			model: ufwdAccount,
			key: 'accountId'
		}
	},
	groupId: {
		type: Sequelize.INTEGER,
		references: {
			model: Group,
			key: 'id'
		}
	}
});

module.exports = { Group, Member };