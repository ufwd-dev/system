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

		const response = {};
	
		const ufwd = _.pick(ufwdAccount, [
			'name', 'phone', 'identification', 'party', 'street', 'examine', 'sex', 'unit', 'job', 'created_at'
		]);
	
		response.name = account.name;
		response.id = account.id;
		response.ufwd = ufwd;

		list.push(response);
	}

	res.data(list);

	next();
};