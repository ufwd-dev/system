'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteMemberAccount(req, res, next) {
	const {accountId, groupId} = req.params;
	const Member = res.sequelize.model('ufwdMember');

	const member = yield Member.findOne({
		where: {
			accountId, groupId
		}
	});
	
	if (!member) {
		throwError('Member is not exist', 404);
	}

	const result = yield member.destroy();

	res.data(result);

	next();
};