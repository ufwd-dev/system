'use strict';

const { throwError} = require('error-standardize');

module.exports = function* getStreet(req, res, next) {
	const Street = res.sequelize.model('ufwdStreet');
	const {ufwd} = req.body;

	if (ufwd) {

		if (ufwd.street) {

			const streetObject = yield Street.findOne({
				where: {
					id: ufwd.street
				}
			});
		
			if (!streetObject) {
				throwError('The street is not existed', 404);
			}
		}
	}

	next();
	
};