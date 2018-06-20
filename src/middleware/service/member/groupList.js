'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getMemberGroupList(req, res, next) {
	const accountId = req.params.accountId;

	const Member = res.sequelize.model('ufwdMember');
	const Group = res.sequelize.model('ufwdGroup');

	const _ = require('lodash');
	
	const memberList = yield Member.findAll({
		where: {
			accountId
		}
	});

	const list = [];

	for (let i = 0; i < memberList.length; i++) {

		const group = yield Group.findOne({
			where: {
				id: memberList[i].groupId
			}
		});
	
		list.push(group);
	}

	res.data(list);

	next();
};