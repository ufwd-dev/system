'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateGroup(req, res, next) {
	const Group = res.sequelize.model('ufwdGroup');
	const group = res.data();

	const oldGroup = yield Group.findOne({
		where: {
			name: req.body.name
		}
	});

	if (oldGroup && oldGroup.id !== group.id) {
		throwError('The group is existed.', 403);
	}

	const newGroup = yield group.update(req.body);

	res.data(newGroup);
	
	next();
};