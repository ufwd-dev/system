'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteActivityTag(req, res, next) {
	const ActivityTag = res.sequelize.model('ufwdActivityTag');
	const Activity = res.sequelize.model('ufwdActivity');
	const tagId = req.params.tagId;
	
	const activityTag = yield ActivityTag.findOne({
		where: {
			id: tagId
		},
		include: [{
			model: Activity,
			where: {
				published: true
			}
		}]
	});

	if (!activityTag) {
		throwError('The activityTag is not exsited or no authority.', 404);
	}

	const result = yield activityTag.destroy();

	res.data({
		destroy: result
	});

	next();
};