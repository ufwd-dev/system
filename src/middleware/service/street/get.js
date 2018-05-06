'use strict';

const { throwError} = require('error-standardize');

module.exports = function* getStreetList(req, res, next) {
	const Street = res.sequelize.model('ufwdStreet');

	const streetList = yield Street.findAll();

	if (streetList.length === 0) {
		throwError('No Street', 404);
	}

	res.data(streetList);

	next();
};