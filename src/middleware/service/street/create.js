'use strict';

const { throwError} = require('error-standardize');

module.exports = function* createStreet(req, res, next) {
	const {name} = req.body;
	const Street = res.sequelize.model('ufwdStreet');

	const street = yield Street.findOne({
		where: {
			name
		}
	});

	if (street) {
		throwError('The Street is existed.', 403);
	}

	const newStreet = yield Street.create({
		name
	});

	res.data(newStreet);

	next();
};