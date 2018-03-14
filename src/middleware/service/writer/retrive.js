'use strict';

const {throwError} = require('error-standardize');

module.exports = function* getWriter(req, res, next) {
	const Writer = res.sequelize.model('ufwdWriter');
	const UfwdAccount = res.sequelize.model('ufwdAccount');
	const Account = res.sequelize.model('account');
	const writerId = req.params.writerId;

	const writer = yield Writer.findOne({
		where: {
			id: writerId
		},
		include: [{
			model: UfwdAccount,
			include: [{
				model: Account
			}]
		}]
	});

	if (!writer) {
		throwError('the writer is not existed.', 403);
	}

	res.data(writer);

	next();
};