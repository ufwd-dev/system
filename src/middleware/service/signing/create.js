'use strict';

const { throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* createAttendance(req, res, next) {
	const Attendance = res.sequelize.model('ufwdAttendance');

	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Member = res.sequelize.model('ufwdMember');
	const Activity = res.sequelize.model('ufwdActivity');

	const {accountId, groupId, activityId} = req.body;
	const attendanceList = [];

	const activity = yield Activity.findOne({
		where: {
			id: activityId
		}
	});

	if (!activity) {
		throwError('The activity is not existed', 404);
	}

	if (accountId) {
		const account = yield Account.findOne({
			where: {
				id: accountId
			},
			include: [{
				model: UfwdAccount
			}]
		});
	
		if (!account) {
			throwError('Account is not existed.', 404);
		}

		const attendance = yield Attendance.findOrCreate({
			where: {
				accountId,
				activityId
			}
		});

		attendanceList.push(attendance);
	}

	if (groupId) {
		const accountList = yield UfwdAccount.findAll({
			include: [{
				model: Member,
				where: {
					groupId
				}
			}]
		});

		if (accountList.length === 0) {
			return;
		}

		const list = accountList.map(item => item.accountId);

		const attendanceArray = yield Attendance.findAll({
			where: {
				activityId,
				accountId: {
					[Sequelize.Op.in]: list
				}
			}
		});

		const same = attendanceArray.map(attendance => attendance.accountId);

		const newList = list.filter(ele => {
			
			return !same.includes(ele);
		}).map(ele => {
			return {
				accountId: ele,
				activityId
			};
		});

		const attendance = yield Attendance.bulkCreate(newList);

		accountList.push(attendance);
	}

	res.data(attendanceList);

	next();
};