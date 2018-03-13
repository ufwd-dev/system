'use strict';

module.exports = function* updateAccount(req, res, next) {
	const examine = req.body.examine;
	const ufwdAccount = res.data();
	
	const newUfwdAccount = yield ufwdAccount.update({examine});

	res.data(newUfwdAccount);

	next();
};