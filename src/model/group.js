'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const ufwdAccount = sequelize.model('ufwdAccount');

const Group = sequelize.define('ufwdGroup', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	}
}, {
	paranoid: true
});

const Member = sequelize.define('ufwdMember', {
	accountId: {
		type: Sequelize.INTEGER,
	},
	groupId: {
		type: Sequelize.INTEGER,
	}
}, {
	paranoid: true
});

module.exports = { Group, Member };