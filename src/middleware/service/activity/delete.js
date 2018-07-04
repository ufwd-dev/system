'use strict';

module.exports = function* deleteActivity(req, res, next) {
	const activity = res.data();
	
	const result = yield activity.destroy();
	
	res.data({
		destroy: result
	});

	next();
};