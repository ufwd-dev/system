'use strict';

module.exports = function* getIdentityList(req, res, next) {
	const Identity = res.sequelize.model('ufwdIdentity');

	const identityList = yield Identity.findAll();

	res.data(identityList);

	next();
};