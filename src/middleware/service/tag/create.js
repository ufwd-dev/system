'use strict';

module.exports = function* createActivityTag(req, res, next) {
	const ActivityTag = res.sequelize.model('ufwdActivityTag');
	const activityId = req.params.activityId;
	const tag = req.body.tag;

	const activityTag = yield ActivityTag.findOrCreate({
		where: {
			activityId, tag
		}
	});

	res.data(activityTag);

	next();
};