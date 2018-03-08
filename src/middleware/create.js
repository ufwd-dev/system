'use strict';

const {throwError} = require('error-standardize');

const Ajv = require('ajv');
const ajv = new Ajv({
    useDefaults: true
});
const ufwdSchema = {
    properties: {
        ufwd: {
            type: 'object',
            default: {}
        }
    },
    required: ['ufwd']
};
const schema = {
    properties: {
        name: {
            type: 'string',
            default: ''
        },
        sex: {
            type: 'string'
        },
        phone: {
            type: 'string',
            default: ''
        }
    },
    required: ['name', 'phone']
};
const validate = ajv.compile(schema);
const validateUfwd = ajv.compile(ufwdSchema);

module.exports = function* createProfile(req, res, next) {
	const account = res.data();
	const UfwdAccount = res.sequelize.model('ufwdAccountProfile');

    if (!validateUfwd(req.body) || !validate( req.body.ufwd)) {
        req.body.ufwd = {
            name: '',
            phone: ''
        };

        yield UfwdAccount.create(Object.assign({
            account: account.id
        }, req.body.ufwd));
        
        throwError('the input is error!', 400);
    }
 
	yield UfwdAccount.create(Object.assign({
		account: account.id
	}, req.body.ufwd));

	next();
};