'use strict';

module.exports = function* deleteGroup(req, res, next) {
	const group = res.data();

	const result = yield group.destroy();

	res.data({
		destroyed: result
	});

	next();
};