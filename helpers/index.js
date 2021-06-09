const dbValidator = require('../helpers/dbValidator');
const generateJWT = require('../helpers/generateJWT');
const uploadFile = require('../helpers/uploadFile');
const googleVerify = require('../helpers/googleVerify');

module.exports = {

    ...dbValidator,
    ...generateJWT,
    ...uploadFile,
    ...googleVerify

}