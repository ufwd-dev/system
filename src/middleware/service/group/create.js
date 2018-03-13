'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createGroup(req, res, next) {
	const Group = res.sequelize.model('ufwdGroup');
	const {name, description} = req.body;

	const group = yield Group.findOne({
		where: {
			name
		}
	});

	if (group) {
		throwError('this group is existed.', 403);
	}

	const newGroup = yield Group.create({
		name, description
	});

	res.data(newGroup);

	next();
};