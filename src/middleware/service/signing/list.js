'use strict';

const {throwError} = require('error-standardize');
const _ = require('lodash');

module.exports = function* getActivityAttendanceList(req, res, next) {
	const Attendance = res.sequelize.model('ufwdAttendance');

	const UfwdAccount = res.sequelize.model('ufwdAccount');
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
		},
		include: [{
			model: UfwdAccount
		}]
	});

	const list = attendanceList.map(attendance => {
		const item = _.pick(attendance.ufwdAccount, ['accountId', 'name', 'identification', 'phone']);

		item.sign = attendance.time;

		return item;
	});

	res.data(list);

	next();
};