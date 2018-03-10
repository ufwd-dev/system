'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const Account = sequelize.model('account');
const Channel = sequelize.model('ufwdChannel');

const Writer = module.exports = sequelize.define('ufwdWriter', {
    account: {
        type: Sequelize.INTEGER,
        references: {
            model: Account,
            key: 'id'
        },
        allowNull: false,
        primaryKey: true
    },
    channel: {
        type: Sequelize.INTEGER,
        references: {
            model: Channel,
            key: 'id'
        },
        allowNull: false
    }
});