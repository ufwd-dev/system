'use strict';

module.exports = function* deleteGroup(req, res, next) {
	const group = res.data();
	const Member = res.sequelize.model('ufwdMember');

	yield Member.destroy({
		where: {
			groupId: group.id
		}
	});

	const result = yield group.destroy();

	res.data({
		destroyed: result
	});

	next();
};