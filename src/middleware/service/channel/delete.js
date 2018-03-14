'use strict';

module.exports = function* deleteChannel(req, res, next) {
	const channel = res.data();

	const result = yield channel.destroy();

	res.data({
		destroyed: result
	});

	next();
};