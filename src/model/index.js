'use strict';
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Account = sequelize.model('account');
const UfwdAccount = require('./account');
const Administrator = require('./administrator');
const Notification = require('./notification');
const Advise = require('./advise');
const {Group, Member} = require('./group');
const Party = require('./party');
const Street = require('./street');

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

Party.hasMany(UfwdAccount, {
	foreignKey: 'party',
});

Street.hasMany(UfwdAccount, {
	foreignKey: 'street',
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
