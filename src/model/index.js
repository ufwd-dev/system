'use strict';
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Account = sequelize.model('account');
const UfwdAccount = require('./account');
const Administrator = require('./administrator');
const Notification = require('./notification');
const Advise = require('./advise');
const {Channel, Subscribe} = require('./channel');
const {Group, Member} = require('./group');
const Writer = require('./writer');

UfwdAccount.belongsTo(Account, {
	foreignKey: 'accountId',
});
Account.hasOne(UfwdAccount, {
	foreignKey: 'accountId',
});

Administrator.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
UfwdAccount.hasOne(Administrator, {
	foreignKey: 'accountId',
});

Writer.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
Writer.belongsTo(Channel, {
	foreignKey: 'channelId',
});
UfwdAccount.hasMany(Writer, {
	foreignKey: 'accountId',
});
Channel.hasMany(Writer, {
	foreignKey: 'channelId',
});

Subscribe.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
Subscribe.belongsTo(Channel, {
	foreignKey: 'channelId',
});
UfwdAccount.hasMany(Subscribe, {
	foreignKey: 'accountId',
});
Channel.hasMany(Subscribe, {
	foreignKey: 'channelId',
});

Advise.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
UfwdAccount.hasMany(Advise, {
	foreignKey: 'accountId',
});

Notification.belongsTo(UfwdAccount, {
	foreignKey: 'recevier',
});
UfwdAccount.hasMany(Notification, {
	foreignKey: 'recevier',
});

Member.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
Member.belongsTo(Group, {
	foreignKey: 'groupId',
});
UfwdAccount.hasMany(Member, {
	foreignKey: 'accountId',
});
Group.hasMany(Member, {
	foreignKey: 'groupId',
});
