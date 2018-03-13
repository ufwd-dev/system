'use strict';

module.exports = function* getMemberGroupList(req, res, next) {
	const accountId = req.params.accountId;
	const Member = res.sequelize.model('ufwdMember');
	const Group = res.sequelize.model('ufwdGroup');

	const member = yield Member.findAll({
		where: {
			accountId
		},
		include: [{
			model: Group
		}]
	});

	res.data(member);

	next();
};