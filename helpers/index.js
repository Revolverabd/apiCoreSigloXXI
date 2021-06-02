const dbValidator = require('../helpers/dbValidator');
const generateJWT = require('../helpers/generateJWT');
const uploadFile = require('../helpers/uploadFile');

module.exports = {

    ...dbValidator,
    ...generateJWT,
    ...uploadFile

}