'use strict';

const Sequelize = require('sequelize');

module.exports = function* getGroupList(req, res, next) {
	const Group = res.sequelize.model('ufwdGroup');
	const query = {};

	req.query.name ? (query.name = {[Sequelize.Op.like]: `%${req.query.name}%`}) : undefined;

	const groupList = yield Group.findAll({
		where: query
	});

	res.data(groupList);

	next();
};