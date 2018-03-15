'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getOwnGroup(req, res, next) {
	const Member = res.sequelize.model('ufwdMember');
	const accountId = req.session.accountId;
	const groupId = req.params.groupId;

	const group = yield Member.findOne({
		where: {
			accountId, groupId
		}
	});

	if (!group) {
		throwError('The group is not existed.', 404);
	}

	res.data(group);

	next();
};