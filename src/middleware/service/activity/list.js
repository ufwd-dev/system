'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getActivityList(req, res, next) {
	const Activity = res.sequelize.model('ufwdActivity');
	const ActivityTag = res.sequelize.model('ufwdActivityTag');
	const {keyword, published, start, end, tag} = req. query;
	const query = {
		where: {},
		include: [{
			model: ActivityTag 
		}]
	};

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}, query.where.description = {[Sequelize.Op.like]: `%${keyword}%`},
		query.where.location = {[Sequelize.Op.like]: `%${keyword}%`}, query.where.abstract = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	published ? (query.where.published = (published === 'true' ? true : false)) : undefined;

	start ? (query.where.start = {[Sequelize.Op.gt]: new Date(start)}) : undefined;

	end ? (query.where.end = {[Sequelize.Op.gt]: new Date(end)}) : undefined;

	tag ? (query.include[0].where = {}, query.include[0].where.tag = {[Sequelize.Op.like]: `%${tag}%`}) :undefined;

	const activityList = yield Activity.findAll(query);

	res.data(activityList);

	next();
};