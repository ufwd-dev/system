'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Identity = module.exports = sequelize.define('ufwdIdentity', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const IdentityLabel = sequelize.define('ufwdIdentityLabel', {
	accountId: {
		type: Sequelize.INTEGER,
	},
	identityId: {
		type: Sequelize.INTEGER,
	}
});

module.exports = { Identity, IdentityLabel };