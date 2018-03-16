'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const ufwdAccount = module.exports = sequelize.define('ufwdAccount', {
	accountId: {
		primaryKey: true,
		type: Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: Sequelize.CHAR(8),
		allowNull: false
	},
	sex: {
		type: Sequelize.TINYINT,
		set(value) {
			if (value === 'female') {
				this.setDataValue('sex', 0);
			} else if (value === 'male'){
				this.setDataValue('sex', 1);
			} 
		},
		defaultValue: 0
	},
	phone: {
		type: Sequelize.CHAR(20),
		allowNull: false,
		unique: true
	},
	examine: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	}
}, {
	paranoid: true
});
