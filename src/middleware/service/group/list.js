'use strict';

module.exports = function* getGroupList(req, res, next) {
	const Group = res.sequelize.model('ufwdGroup');

	const groupList = yield Group.findAll();
	res.data(groupList);

	next();
};