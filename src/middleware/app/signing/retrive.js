'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getOwnAttendance(req, res, next) {
	const accountId = req.session.accountId;
	const activityId = req.params.activityId;
	const Attendance = res.sequelize.model('ufwdAttendance');
	const Activity = res.sequelize.model('ufwdActivity');
	
	const activity = yield Activity.findOne({
		where: {
			id: activityId,
			published: true
		}
	});

	const attendance = yield Attendance.findOne({
		where: {
			accountId, activityId
		}
	});

	if (!activity) {
		throwError('The activity is not existed', 404);
	}

	res.data({
		activity,
		attendance
	});

	next();
};