'use strict';
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;

const Account = sequelize.model('account');
const UfwdAccount = require('./account');
const {Identity, IdentityLabel} = require('./identity');
const Administrator = require('./administrator');
const Notification = require('./notification');
const Advise = require('./advise');
const {Group, Member} = require('./group');
const Party = require('./party');
const Street = require('./street');
const { Activity, Attendance, ActivityTag } = require('./activity');

Activity.hasMany(Attendance, {
	foreignKey: 'activityId'
});
Attendance.belongsTo(Activity, {
	foreignKey: 'activityId'
});

UfwdAccount.hasMany(Attendance, {
	foreignKey: 'accountId'
});
Attendance.belongsTo(UfwdAccount, {
	foreignKey: 'accountId'
});

Activity.hasMany(ActivityTag, {
	foreignKey: 'activityId'
});
ActivityTag.belongsTo(Activity, {
	foreignKey: 'activityId'
});

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
	foreignKey: 'receiver',
});
UfwdAccount.hasMany(Notification, {
	foreignKey: 'receiver',
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

IdentityLabel.belongsTo(UfwdAccount, {
	foreignKey: 'accountId',
});
IdentityLabel.belongsTo(Identity, {
	foreignKey: 'identityId',
});
UfwdAccount.hasMany(IdentityLabel, {
	foreignKey: 'accountId',
});
Identity.hasMany(IdentityLabel, {
	foreignKey: 'identityId',
});
