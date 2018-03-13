'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getMemberGroup(req, res, next) {
	const {accountId, groupId} = req.params;
	const Member = res.sequelize.model('ufwdMember');
	const Group = res.sequelize.model('ufwdGroup');

	const member = yield Member.findOne({
		include: [{
			model: Group,
			where: {
				id: groupId
			}
		}],
		where: {
			accountId, groupId
		}
	});

	if (!member) {
		throwError('member is not exist', 404);
	}

	res.data(member);

	next();
};