'use strict';

module.exports = function* getMemberGroupList(req, res, next) {
	const accountId = req.params.accountId;
	const Member = res.sequelize.model('ufwdMember');

	const member = yield Member.findAll({
		where: {
			accountId
		}
	});

	res.data(member);

	next();
};