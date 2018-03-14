'use strict';

module.exports = function* deleteAdvise(req, res, next) {
	const advise = res.data();

	const result = yield advise.destroy();
	res.data({
		destroyed: result
	});

	next();
};