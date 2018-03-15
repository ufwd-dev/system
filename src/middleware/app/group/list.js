'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getOwnGroupList(req, res, next) {
	const Member = res.sequelize.model('ufwdMember');
	const accountId = req.session.accountId;

	const groupList = yield Member.findAll({
		where: {
			accountId
		}
	});

	if (groupList.length === 0) {
		throwError('The group is not exist.', 404);
	}

	res.data(groupList);

	next();
};