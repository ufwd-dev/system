'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteIdentityLabel(req, res, next) {
	const {accountId, identityId} = req.params;
	const IdentityLabel = res.sequelize.model('ufwdIdentityLabel');

	const identityLabel = yield IdentityLabel.findOne({
		where: {
			accountId, identityId
		}
	});
	
	if (!identityLabel) {
		throwError('IdentityLabel is not exist', 404);
	}

	const result = yield identityLabel.destroy();

	res.data(result);

	next();
};