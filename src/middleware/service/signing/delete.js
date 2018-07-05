'use strict';

const { throwError} = require('error-standardize');

module.exports = function* deleteAttendance(req, res, next) {
	const Attendance = res.sequelize.model('ufwdAttendance');
	const {accountId, activityId} = req.params;

	const attendance = yield Attendance.findOne({
		where: {
			accountId,
			activityId
		}
	});

	if (!attendance) {
		throwError('The attendance is not existed.', 403);
	}

	yield attendance.destroy();

	res.data(attendance);

	next();
};