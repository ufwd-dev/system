'use strict';

module.exports = function* getOwnGroupList(req, res, next) {
	const Member = res.sequelize.model('ufwdMember');
	const accountId = req.session.accountId;

	const groupList = yield Member.findAll({
		where: {
			accountId
		}
	});

	res.data(groupList);

	next();
};