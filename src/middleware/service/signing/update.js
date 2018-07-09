'use strict';

const {throwError} = require('error-standardize');
const moment = require('moment');

module.exports = function* changeStatus(req, res, next) {
	const {accountId, activityId} = req.params;

	const Attendance = res.sequelize.model('ufwdAttendance');
	const Activity = res.sequelize.model('ufwdActivity');

	const date = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');

	const activity = yield Activity.findOne({
		where: {
			id: activityId
		}
	});

	if (!activity) {
		throwError('The activity is not existed.', 404);
	}

	const attendance = yield Attendance.findOne({
		where: {
			accountId,
			activityId
		}
	});

	if (!attendance) {
		throwError('You are not in the list of participants.', 404);
	}

	if (attendance.time) {
		throwError('The account have signined.', 403);
	}

	const newSignin = yield attendance.update({
		time: date
	});

	res.data(newSignin);

	next();
};