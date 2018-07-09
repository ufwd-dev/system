'use strict';

module.exports = function redirect(req, res, next) {
	const agent = req.headers['user-agent'];
	
	const reg = new RegExp('Android', 'gi');

	if (reg.test(agent)) {
		return res.redirect('http://www.or-change.cn/download.html');
	} else {
		return res.redirect('https://www.pgyer.com/yBlB');
	}
};