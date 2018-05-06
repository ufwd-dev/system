'use strict';

const { throwError} = require('error-standardize');

module.exports = function* getPartyList(req, res, next) {
	const Party = res.sequelize.model('ufwdParty');

	const partyList = yield Party.findAll();

	if (partyList.length === 0) {
		throwError('No Party', 404);
	}

	res.data(partyList);

	next();
};