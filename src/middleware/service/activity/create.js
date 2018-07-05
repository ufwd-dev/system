'use strict';

const {throwError} = require('error-standardize');

module.exports = function* createActivity(req, res, next) {
	const Activity = res.sequelize.model('ufwdActivity');
	const {start, end} = req.body;
	const date = new Date();

	if (Date.parse(new Date(start)) < Date.parse(date)) {
		throwError('The activity start is illegal.', 403);
	}

	if (Date.parse(start) >= Date.parse(end)) {
		throwError('The activity start is later than end.', 403);
	}

	const activity = yield Activity.create(req.body);

	res.data(activity);

	next();
};