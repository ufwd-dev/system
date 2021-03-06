'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateActivity(req, res, next) {
	const activity = res.data();
	const construction = req.body;
	const date = new Date();

	if (Date.parse(new Date(construction.start)) < Date.parse(date)) {
		throwError('The activity start is illegal.', 403);
	}

	if (Date.parse(construction.start) >= Date.parse(construction.end)) {
		throwError('The activity start is later than end.', 403);
	}

	const result = yield activity.update(construction);

	res.data(result);

	next();
};