'use strict';

module.exports = function* getMemberAccountList(req, res, next) {
	const groupId = req.params.groupId;
	const Member = res.sequelize.model('ufwdMember');

	const memberList = yield Member.findAll({
		where: {
			groupId
		}
	});

	res.data(memberList);

	next();
};