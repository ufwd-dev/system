'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getMemberGroupList(req, res, next) {
	const accountId = req.params.accountId;

	const Member = res.sequelize.model('ufwdMember');
	const Group = res.sequelize.model('ufwdGroup');

	const _ = require('lodash');

	const groupList = yield Group.findAll({
		include: [{
			model: Member,
			where: {
				accountId
			}
		}]
	});

	const list = groupList.map(group => {
		return {id: group.id, name: group.name, description: group.description};
	});

	res.data(list);

	next();
};