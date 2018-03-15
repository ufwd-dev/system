'use strict';

const Sequelize = require('sequelize');
const {throwError} = require('error-standardize');

module.exports = function* getGroupList(req, res, next) {
	const Group = res.sequelize.model('ufwdGroup');
	const query = {};

	req.query.name ? (query.name = {[Sequelize.Op.like]: `%${req.query.name}%`}) : undefined;

	const groupList = yield Group.findAll({
		where: query
	});

	if (groupList.length === 0) {
		throwError('The group is not exist.', 404);
	}

	res.data(groupList);

	next();
};