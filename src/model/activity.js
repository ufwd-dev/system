'use strict';

const lemonitor = require('lemonitor-service');
const Sequelize = require('sequelize');
const sequelize = lemonitor.sequelize;

const Activity = sequelize.define('ufwdActivity', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false
	},
	abstract: {
		type: Sequelize.STRING
	},
	start: {
		type: Sequelize.DATE,
		allowNull: false
	},
	end: {
		type: Sequelize.DATE,
		allowNull: false
	},
	published: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	token: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1
	}
}, {
	paranoid: true
});

const Attendance = sequelize.define('ufwdAttendance', {
	time: {
		type: Sequelize.DATE,
		allowNull: false
	}
}, {
	paranoid: true
});

const ActivityTag = sequelize.define('ufwdActivityTag', {
	tag: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = { Activity, Attendance, ActivityTag };