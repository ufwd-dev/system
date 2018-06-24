'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getMemberAccountList(req, res, next) {
	const groupId = req.params.groupId;

	const Member = res.sequelize.model('ufwdMember');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');

	const _ = require('lodash');

	const accountList = yield UfwdAccount.findAll({
		include: [{
			model: Member,
			where: {
				groupId
			}
		}, {
			model: Account
		}]
	});

	const list = accountList.map(item => {
		const response = {};

		const ufwd = _.pick(item, [
			'name', 'phone', 'identification', 'party', 'street', 'examine', 'sex', 'unit', 'job', 'created_at'
		]);

		response.name = item.account.name;
		response.id = item.account.id;
		response.ufwd = ufwd;

		return response;
	});

	res.data(list);

	next();
};