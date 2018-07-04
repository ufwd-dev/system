'use strict';

const {throwError} = require('error-standardize');

module.exports = function* isPublished(req, res, next) {
	const Activity = res.sequelize.model('ufwdActivity');
	const activityId = req.params.activityId;

	const activity = yield Activity.findOne({
		where: {
			id: activityId,
			published: true
		}
	});

	if (!activity) {
		throwError('The activity is not existed or has published', 403);
	}

	res.data(activity);

	next();
};