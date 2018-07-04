'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getActivity(req, res, next) {
	const Activity = res.sequelize.model('ufwdActivity');
	const activityId = req.params.activityId;

	const activity = yield Activity.findOne({
		where: {
			id: activityId
		}
	});

	if (!activity) {
		throwError('The activity is not existed', 404);
	}

	res.data(activity);

	next();
};