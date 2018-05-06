'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Party = module.exports = sequelize.define('ufwdParty', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});