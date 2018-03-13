'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getGroup(req, res, next) {
	const Group = res.sequelize.model('ufwdGroup');
	const groupId = req.params.groupId;

	const group = yield Group.findOne({
		where: {
			id: groupId
		}
	});

	if (!group) {
		throwError('the group is not exist', 404);
	}

	res.data(group);

	next();
};