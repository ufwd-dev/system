'use strict';

const { throwError } = require('error-standardize');

module.exports = function* deleteChannel(req, res, next) {
	const channel = res.data();

	if (!channel) {
		throwError('this channel is not exist.', 404);
	}

	const result = yield channel.destroy();

	res.data({
		destroyed: result
	});

	next();
};