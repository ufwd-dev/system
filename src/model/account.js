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
		type: Sequelize.CHAR(8)
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
		get() {
			const sex = this.getDataValue('sex');

			return sex === 0 ? 'female' : 'male';
		},
		defaultValue: 0
	},
	phone: {
		type: Sequelize.CHAR(20)
	},
	identification: {
		type: Sequelize.CHAR(30)
	},
	examine: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	unit: {
		type: Sequelize.STRING(255)
	},
	job: {
		type: Sequelize.STRING(255)
	},
	inputor: {
		type: Sequelize.INTEGER
	}
}, {
	paranoid: true
});
