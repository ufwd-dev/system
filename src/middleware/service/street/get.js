'use strict';

module.exports = function* getStreetList(req, res, next) {
	const Street = res.sequelize.model('ufwdStreet');

	const streetList = yield Street.findAll();

	res.data(streetList);

	next();
};