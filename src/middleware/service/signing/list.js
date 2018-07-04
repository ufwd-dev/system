'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getActivityAttendanceList(req, res, next) {
	const Attendance = res.sequelize.model('ufwdAttendance');
	const Activity = res.sequelize.model('ufwdActivity');
	const activityId = req.params.activityId;

	const activity = yield Activity.findOne({
		where: {
			id: activityId
		}
	});

	if (!activity) {
		throwError('The activity is not existed', 404);
	}

	const attendanceList = yield Attendance.findAll({
		where: {
			activityId
		}
	});

	res.data(attendanceList);

	next();
};