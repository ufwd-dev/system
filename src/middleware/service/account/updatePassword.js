'use strict';

module.exports = function* updatePassword(req, res, next) {
	const password = req.body.password;
	const account = res.data();

	const result = yield account.update({
		password
	});

	res.data(result);
	
	next();
};