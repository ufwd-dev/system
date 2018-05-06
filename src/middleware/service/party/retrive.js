'use strict';

const { throwError} = require('error-standardize');

module.exports = function* getParty(req, res, next) {
	const Party = res.sequelize.model('ufwdParty');
	const {ufwd} = req.body;
	
	if (ufwd) {

		if (ufwd.party) {
	
			const partyObject = yield Party.findOne({
				where: {
					id: ufwd.party
				}
			});
	
			if (!partyObject) {
				throwError('The party is not existed', 404);
			}
		}
	}

	next();
};