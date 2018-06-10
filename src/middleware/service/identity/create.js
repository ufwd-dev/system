'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createIdentity(req, res, next) {
	const {name} = req.body;
	const Identity = res.sequelize.model('ufwdIdentity');

	const identity = yield Identity.findOne({
		where: {
			name
		}
	});

	if (identity) {
		throwError('The party is existed.', 403);
	}

	const newIdentity = yield Identity.create({
		name
	});

	res.data(newIdentity);

	next();
};