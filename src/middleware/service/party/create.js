'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createParty(req, res, next) {
	const {name} = req.body;
	const Party = res.sequelize.model('ufwdParty');

	const party = yield Party.findOne({
		where: {
			name
		}
	});

	if (party) {
		throwError('The party is existed.', 403);
	}

	const newParty = yield Party.create({
		name
	});

	res.data(newParty);

	next();
};