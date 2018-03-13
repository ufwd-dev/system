'use strict';

module.exports = function* getMemberAccountList(req, res, next) {
	const groupId = req.params.groupId;
	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');

	const memberList = yield Member.findAll({
		where: {
			groupId
		},
		include: [{
			model: UfwdAccount,
			include: [{
				model: Account
			}]
		}]
	});

	res.data(memberList);

	next();
};