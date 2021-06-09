
const validateJWT = require('../middlewares/validateJWT');
const validateFields = require('../middlewares/validateFields');
const validateRol = require('../middlewares/validateRol');
const validateFileUp = require('../middlewares/validateFileUp');

module.exports = {
    ...validateJWT,
    ...validateFields,
    ...validateRol,
    ...validateFileUp
}