'use strict';

const Sequelize = require('sequelize');
const lemonitor = require('lemonitor-service');

const sequelize = lemonitor.sequelize;
const Account = sequelize.model('account');

const Profile = module.exports = sequelize.define('ufwdAccountProfile', {
    account: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
            model: Account,
            key: 'id'
        },
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    sex: {
        type: Sequelize.TINYINT,
        get(value) {
            if (value === 'female') {
                this.setDataValue('sex', 0);
            } else if (value === 'male'){
                this.setDataValue('sex', 1);
            }
        }
    },
    phone: {
        type: Sequelize.CHAR(64),
        allowNull: false
    },
    state: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});