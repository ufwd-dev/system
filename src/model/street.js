'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Street = module.exports = sequelize.define('ufwdStreet', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});