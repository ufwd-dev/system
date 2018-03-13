'use strict';

module.exports = function* getChannelList(req, res, next) {
	const Channel = res.sequelize.model('ufwdChannel');

	const channelList = yield Channel.findAll();
	res.data(channelList);

	next();
};