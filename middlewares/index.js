
const validateJWT = require('../middlewares/validateJWT');
const validateFields = require('../middlewares/validateFields');
const validateRol = require('../middlewares/validateRol');

module.exports = {
    ...validateJWT,
    ...validateFields,
    ...validateRol
}