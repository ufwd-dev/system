'use strict';

module.exports = function* validateAccount(req, res, next) {
	const Account = res.sequelize.model('account');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const { name, phone, identification } = req.query;
	let existed;

	const account = yield Account.findOne({
		where: { name }
	});

	const accountOne = yield UfwdAccount.findOne({
		where: { phone }
	});

	const accountTwo = yield UfwdAccount.findOne({
		where: { identification }
	});

	if (account || accountOne || accountTwo) {
		existed = true;
	} else {
		existed = false;
	}

	res.data({
		existed
	});

	next();	
};