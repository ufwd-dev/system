'use strict';

const {throwError} = require('error-standardize');

module.exports = function* updateChannel(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');

	const oldChannel = yield Channel.findOne({
		where: {
			name: req.body.name
		}
	});

	const channel = res.data();

	if (!channel) {
		throwError('channel is not existed', 404);
	}

	if (oldChannel) {
		throwError('this name is existed', 403);
	}

	const newChannel = yield channel.update(req.body);

	res.data(newChannel);

	next();

};