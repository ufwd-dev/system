'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getMemberAccountList(req, res, next) {
	const groupId = req.params.groupId;

	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');

	const _ = require('lodash');

	const memberList = yield Member.findAll({
		where: {
			groupId
		}
	});

	const list = [];

	for (let i = 0; i < memberList.length; i++) {

		const ufwdAccount = yield UfwdAccount.findOne({
			where: {
				accountId: memberList[i].accountId
			}
		});
	
		const account = yield Account.findOne({
			where: {
				id: memberList[i].accountId
			}
		});
	
		const mixedAccount = _.pick(ufwdAccount, [
			'name', 'phone', 'party', 'street'
		]);
	
		mixedAccount.username = account.name;

		list.push(mixedAccount);
	}

	res.data(list);

	next();
};