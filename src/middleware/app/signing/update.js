'use strict';

const {throwError} = require('error-standardize');
const moment = require('moment');

module.exports = function* updateAttendance(req, res, next) {
	const accountId = req.session.accountId;
	const token = req.body.token;
	const Attendance = res.sequelize.model('ufwdAttendance');
	const Activity = res.sequelize.model('ufwdActivity');
	const date = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');

	const activity = yield Activity.findOne({
		where: {
			token,
			published: true
		}
	});

	if (!activity) {
		throwError('The activity is not existed.', 404);
	}

	const attendance = yield Attendance.findOne({
		where: {
			accountId,
			activityId: activity.id
		}
	});

	if (!attendance) {
		throwError('You are not in the list of participants.', 404);
	}

	if (attendance.time) {
		throwError('You have signined.', 403);
	}

	const newSignin = yield Attendance.update({
		time: date
	});

	res.data(newSignin);

	next();
};