'use strict';

module.exports = function* getPartyList(req, res, next) {
	const Party = res.sequelize.model('ufwdParty');

	const partyList = yield Party.findAll();

	res.data(partyList);

	next();
};