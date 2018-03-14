'use strict';

module.exports = function* createMember(req, res, next) {
	const {accountId, groupId} = req.params;
	const Member = res.sequelize.model('ufwdMember');

	const member = yield Member.findOrCreate({
		where: {
			accountId, groupId
		}
	});

	res.data(member);

	next();
};