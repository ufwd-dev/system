'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createMember(req, res, next) {
	const {accountId, groupId} = req.params;
	const Member = res.sequelize.model('ufwdMember');

	const member = yield Member.findOne({
		where: {
			accountId, groupId
		}
	});

	if (member) {
		throwError('Member is exist.', 403);
	}

	const newMember = yield Member.create({
		accountId, groupId
	});

	res.data(newMember);

	next();
};