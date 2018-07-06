'use strict';

const _ = require('lodash');

module.exports = function* getAttendancedList(req, res, next) {
	const accountId = req.session.accountId;
	const Attendance = res.sequelize.model('ufwdAttendance');
	const Activity = res.sequelize.model('ufwdActivity');

	const attendanceList = yield Attendance.findAll({
		where: {
			accountId
		},
		include: [{
			model: Activity	
		}]
	});

	const list = attendanceList.map(attendance => {
		const activity = _.pick(attendance.ufwdActivity, ['id', 'title', 'abstract', 'start', 'end', 'created_at']);

		activity.signIn = attendance.time;

		return activity;
	});

	res.data(list);

	next();
};