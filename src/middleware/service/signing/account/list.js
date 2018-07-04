'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getAccountAttendanceList(req, res, next) {
	const Attendance = res.sequelize.model('ufwdAttendance');
	const Account = res.sequelize.model('account');
	const accountId = req.params.accountId;

	const account = yield Account.findOne({
		where: {
			id: accountId
		}
	});

	if (!account) {
		throwError('The account is not existed', 404);
	}

	const attendanceList = yield Attendance.findAll({
		where: {
			accountId
		}
	});

	res.data(attendanceList);

	next();
};